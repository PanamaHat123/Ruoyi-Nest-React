
import { request } from '@umijs/max';

// query 测试demo1 list
export async function getDemoTestOneList(params?: API.Demo.DemoTestOneListParams) {
  return request<API.Demo.DemoTestOnePageResult>('/api/demo/demoTestOne/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    params
  });
}

// query 测试demo1 detail
export function getDemoTestOne(testId: number) {
  return request<API.Demo.DemoTestOneInfoResult>(`/api/demo/demoTestOne/${testId}`, {
    method: 'GET'
  });
}

// add 测试demo1
export async function addDemoTestOne(params: API.Demo.DemoTestOne) {
  return request<API.Result>('/api/demo/demoTestOne', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: params
  });
}

// edit 测试demo1
export async function updateDemoTestOne(params: API.Demo.DemoTestOne) {
  return request<API.Result>('/api/demo/demoTestOne', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: params
  });
}

// delete 测试demo1
export async function removeDemoTestOne(ids: string) {
  return request<API.Result>(`/api/demo/demoTestOne/${ids}`, {
    method: 'DELETE'
  });
}

// export 测试demo1
export function exportDemoTestOne(params?: API.Demo.DemoTestOneListParams) {
  return request<API.Result>(`/api/demo/demoTestOne/export`, {
    method: 'GET',
    params
  });
}

    