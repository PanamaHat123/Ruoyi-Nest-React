import { lowercaseFirstLetter, uppercaseFirstLetter } from "../../utils";

export const reactServiceTem = (options) => {
  const { businessName, functionName, moduleName,className,columns } = options;
  const lfclassName = lowercaseFirstLetter(className);
  const upperModuleName = uppercaseFirstLetter(moduleName);
  const primaryFiled = columns.find(filed => filed.isPk == "1");
  const primaryType = primaryFiled?(primaryFiled.javaType || "string"):"string"
  return `
import { request } from '@umijs/max';

// query ${functionName} list
export async function get${className}List(params?: API.${upperModuleName}.${className}ListParams) {
  return request<API.${upperModuleName}.${className}PageResult>('/api/${moduleName}/${businessName}/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    params
  });
}

// query ${functionName} detail
export function get${className}(${primaryFiled.javaField}: ${primaryType}) {
  return request<API.${upperModuleName}.${className}InfoResult>(\`/api/${moduleName}/${businessName}/\${${primaryFiled.javaField}}\`, {
    method: 'GET'
  });
}

// add ${functionName}
export async function add${className}(params: API.${upperModuleName}.${className}) {
  return request<API.Result>('/api/${moduleName}/${businessName}', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: params
  });
}

// edit ${functionName}
export async function update${className}(params: API.${upperModuleName}.${className}) {
  return request<API.Result>('/api/${moduleName}/${businessName}', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: params
  });
}

// delete ${functionName}
export async function remove${className}(ids: string) {
  return request<API.Result>(\`/api/${moduleName}/${businessName}/\${ids}\`, {
    method: 'DELETE'
  });
}

// export ${functionName}
export function export${className}(params?: API.${upperModuleName}.${className}ListParams) {
  return request<API.Result>(\`/api/${moduleName}/${businessName}/export\`, {
    method: 'GET',
    params
  });
}

    `;
};



