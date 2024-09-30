import { createIcon } from '@/utils/IconUtil';
import { MenuDataItem } from '@ant-design/pro-components';
import { request, useIntl } from "@umijs/max";
import React, { lazy } from 'react';


let remoteMenu: any = null;

export function getRemoteMenu() {
  return remoteMenu;
}

export function setRemoteMenu(data: any) {
  remoteMenu = data;
}
let systemElement = null;


function patchRouteItems(route: any, menu: any, parentPath: string) {
  for (const menuItem of menu) {
    if (menuItem.component === 'Layout' || menuItem.component === 'ParentView') {
      if (menuItem.routes) {
        let hasItem = false;
        let newItem = null;
        for (const routeChild of route.routes) {
          if (routeChild.path === menuItem.path) {
            hasItem = true;
            newItem = routeChild;
          }
        }
        if (!hasItem) {
          newItem = {
            path: menuItem.path,
            routes: [],
            children: []
          }
          route.routes.push(newItem)
        }
        patchRouteItems(newItem, menuItem.routes, parentPath + menuItem.path + '/');
      }
    } else {
      const names: string[] = menuItem.component.split('/');
      let path = '';
      names.forEach(name => {
        if (path.length > 0) {
          path += '/';
        }
        if (name !== 'index') {
          path += name.at(0)?.toUpperCase() + name.substr(1);
        } else {
          path += name;
        }
      })
      if (!path.endsWith('.tsx')) {
        path += '.tsx'
      }
      if (route.routes === undefined) {
        route.routes = [];
      }
      if (route.children === undefined) {
        route.children = [];
      }
      if(route.name == null){
        route.name = route.path?.replace("/","")
      }
      const newRoute = {
        element: React.createElement(lazy(() => import('@/pages/' + path))),
        path: parentPath + menuItem.path,
      }
      route.children.push(newRoute);
      route.routes.push(newRoute);

    }
  }
}


export function patchRouteWithRemoteMenus(routes: any) {
  if (remoteMenu === null) { return; }
  let proLayout = null;
  for (const routeItem of routes) {
    if (routeItem.id === 'ant-design-pro-layout') {
      proLayout = routeItem;
      break;
    }
  }
  //找出 system一级路由的 reactElement， 解决没有再route中配置的一级菜单 点击其二级菜单跳转白屏问题
  //原因是 没有再route.ts中配置的一级路由  没有element属性
  const systemRoute = proLayout?.routes?.find(item=>item.path==="/system")
  systemElement = systemRoute?.element
  if(systemElement == null){
    window.alert("systemElement is null")
    console.log("systemElement is null");
  }
  patchRouteItems(proLayout, remoteMenu, '');

  //远程的 一级菜单添加 element属性
  proLayout?.routes?.forEach(route=>{
    if(route.element==null && route.parentId == null){
      //远程的一级菜单
      if(route.name == null){
        route.name = route.path.replace("/","")
      }
      route.parentId = "ant-design-pro-layout"
      route.element = React.cloneElement(systemElement);
      try {
        route.element.props.value.route.parentId = route.parentId;
        route.element.props.value.route.path = route.path;
        route.element.props.value.route.name = route.name;
        // route.element.props.value.route.name = intl.formatMessage({
        //   id: 'pages.searchTable.title',
        //   defaultMessage: route.name,
        // })
        delete route.element.props.value.route.id
      } catch (e) {
        console.log(e);
      }
    }
  })
}

/** 获取当前的用户 GET /api/getUserInfo */
export async function getUserInfo(options?: Record<string, any>) {
  return request<API.UserInfoResult>('/api/system/user/getInfo', {
    method: 'GET',
    ...(options || {}),
  });
}

// 刷新方法
export async function refreshToken() {
  return request('/api/auth/refresh', {
    method: 'post'
  })
}

export async function getRouters(): Promise<any> {
  return request('/api/system/menu/getRouters');
}

export function convertCompatRouters(childrens: API.RoutersMenuItem[]): any[] {
  return childrens.map((item: API.RoutersMenuItem) => {
    return {
      path: item.path,
      icon: createIcon(item.meta.icon),
      //  icon: item.meta.icon,
      name: item.meta.title,
      routes: item.children ? convertCompatRouters(item.children) : undefined,
      hideChildrenInMenu: item.hidden,
      hideInMenu: item.hidden,
      component: item.component,
      authority: item.perms,
    };
  });
}

export async function getRoutersInfo(): Promise<MenuDataItem[]> {
  return getRouters().then((res) => {
    if (res.code === 200) {
      return convertCompatRouters(res.data);
    } else {
      return [];
    }
  });
}

export function getMatchMenuItem(
  path: string,
  menuData: MenuDataItem[] | undefined,
): MenuDataItem[] {
  if (!menuData) return [];
  let items: MenuDataItem[] = [];
  menuData.forEach((item) => {
    if (item.path) {
      if (item.path === path) {
        items.push(item);
        return;
      }
      if (path.length >= item.path?.length) {
        const exp = `${item.path}/*`;
        if (path.match(exp)) {
          if (item.routes) {
            const subpath = path.substr(item.path.length + 1);
            const subItem: MenuDataItem[] = getMatchMenuItem(subpath, item.routes);
            items = items.concat(subItem);
          } else {
            const paths = path.split('/');
            if (paths.length >= 2 && paths[0] === item.path && paths[1] === 'index') {
              items.push(item);
            }
          }
        }
      }
    }
  });
  return items;
}
