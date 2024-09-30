
export class StringUtils {
  /**
   * 将字符串转换为小驼峰命名法
   * @param {string} str - 输入的字符串，使用下划线分隔
   * @returns {string} - 转换后的小驼峰命名法字符串
   */
  static toCamelCase(str: string): string {
    return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
  }

  /**
   * 将字符串转换为大驼峰命名法
   * @param {string} str - 输入的字符串，使用下划线分隔
   * @returns {string} - 转换后的大驼峰命名法字符串
   */
  static toPascalCase(str: string) {
    return str[0].toUpperCase() + this.toCamelCase(str).slice(1);
  }
}