/**
 *  @Author     :   ruanchuhao
 *  @Date       :   2023/07/06
 *  @Name       :   validate.ts
 *  @Content    :   ruanchuhao@shgbit.com
 *  @Desc       :
 */

import "reflect-metadata";
import { validateSync as classValidate } from 'class-validator';
import { Logger } from '@nestjs/common';
const logger = new Logger('validate');

const VALIDATE_PARAM = Symbol('VALIDATE_PARAM');


exports.validateReturn =
  exports.validateResponse =
  validateReturn;

exports.validate = validate;
exports.validateParam = validateParam;


/**
 * [ 工具 ] 验证数据是否符合验证类DTO
 * @param {any} source 待验证的数据
 * @param {any} validateClass 验证类DTO
 * @param {boolean} [throwError]  是否抛出错误 默认抛出
 */
function validate(source: any, validateClass: any, throwError: boolean = true) {
  const originProto = Object.getPrototypeOf(source); // 获取原始类的原型链, 用于后面还原
  Object.setPrototypeOf(source, validateClass.prototype); // 原型链设置为验证类的原型链

  const validateResult = classValidate(source)
  if (validateResult.length > 0) {
    const msg = '[validate error] ==>Start: ' + JSON.stringify(validateResult, null, 2) + '[validate error] <==End: ';
    if (throwError) {
      throw new Error(msg);
    } else {
      logger.error(msg);

    }
  }
  Object.setPrototypeOf(source, originProto); // 还原原始类的原型链
  return source;
}

/**
 * [ 方法返回 ]验证装饰器 用于验证方法返回值 可用于所有方法
 * @param {*} validateClass 验证类DTO
 * @param {boolean} [throwError] 是否抛出错误 默认抛出
 */
function validateReturn(validateClass: any, throwError: boolean = true) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = function () {
      let result = method.apply(this, arguments);
      return result instanceof Promise ?
        result.then(result => validate(result, validateClass, throwError)) :
        validate(result, validateClass, throwError);

    };
  };
}

/**
 * [ 方法参数 ]验证装饰器 用于验证方法参数 可用于所有方法
 * 如 async fun(@validateAs(SignInDto) param1: SignInDto, param2, @validateAs(SignInDto2) param3: SignInDto) {
 * @param validateClass 验证类DTO
 * @param throwError 是否抛出错误 默认抛出
 */
function validateAs(validateClass: any, throwError: boolean = true) {
  return function (target: any, propertyKey: string, paramsIndex: number) {
    const validateConstraints = Reflect.getOwnMetadata(VALIDATE_PARAM, target, propertyKey) || {}
    validateConstraints[paramsIndex] = { validateClass, throwError };
    Reflect.defineMetadata(VALIDATE_PARAM, validateConstraints, target, propertyKey);
  }
}

/**
 * [ 方法参数标记 ]验证装饰器 标记该方法需要验证参数是否符合验证类DTO 可用于所有方法
 * 如 async fun(@validateAs(SignInDto) param1: SignInDto, param2, @validateAs(SignInDto2) param3: SignInDto) {
 * @param validateClass 验证类DTO
 * @param throwError 是否抛出错误 默认抛出
 */
function validateParam(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const validateConstraints = Reflect.getOwnMetadata(VALIDATE_PARAM, target, propertyKey);
    Array.prototype.slice.call(arguments).forEach((arg, index) => {
      const configs = validateConstraints[index];
      if (!configs) return;
      const result = validate(arg, configs.validateClass, configs.throwError);

      arguments[index] = result;
    })

    return method.apply(this, arguments);
  };
}


//
// /**
//  * simple test simple test simple test simple test simple test simple test
//  */
// import { ApiProperty } from '@nestjs/swagger';
// import { IsString } from 'class-validator';
//
// export class SignInDto {
//   @ApiProperty({ description: '用户名', example: 'admin' })
//   @IsString()
//   name: string;
//
//   @ApiProperty({ description: '密码(md5)', example: 'e10adc3949ba59abbe56e057f20f883e' })
//   @IsString()
//   password: string;
// }
//
// class Test {
//   @validateReturn(SignInDto)
//   test() {
//     return { name: "123", password: '123' };
//   }
//
//   @validateReturn(SignInDto)
//   async test2() {
//     return await new Promise((resolve, reject)=>{
//       setTimeout(resolve, 1000);
//     }).then(() => {
//       return { name: "123", password: '123' }
//     });
//   }
//
//
//   @validateParam
//   fun(@validateAs(SignInDto, false) param1: any, @validateAs(SignInDto) param2: any){
//     console.log("param1, param2");
//     console.log(param1, param2);
//   }
//
//   @validateParam
//   fun2(param1: any, @validateAs(SignInDto) param2: any){
//     console.log("param1, param2");
//     console.log(param1, param2);
//   }
//
//     @validateParam
//   async fun3(@validateAs(SignInDto, false) param1: any, @validateAs(SignInDto) param2: any){
//     console.log("param1, param2");
//     console.log(param1, param2);
//   }
//
//
// }
//
//
// // // 1 not promise
// // console.log(new Test().test());
// // console.log('-------------------');
// // // 2 promise
// // new Test().test2().then((res) => {console.log(res);});
//
// // // param check
// // // 1 not promise
// // new Test().fun(
// //   { name: 1231, password: '123'},
// //   { name: "1232", password: '1232'}
// // )
// // new Test().fun2(
// //   { name: 1231, password: '123'},
// //   { name: 1232, password: '1232'}
// // )
// //
// // // 2 promise
// // new Test().fun3(
// //   { name: "1231", password: '123'},
// //   { name: "1232", password: '1232'}
// // )