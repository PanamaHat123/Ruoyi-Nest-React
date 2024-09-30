Language : EN | [中](./README.ZH.md)

<p align="center">
  <a href="https://nestjs.com">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://nestjs.com/logo-small-gradient.76616405.svg">
      <img src="https://nestjs.com/logo-small-gradient.76616405.svg" height="80">
    </picture>
    <h1 align="center">Ruoyi-Nest-React</h1>
  </a>
</p>

[//]: # (<div align="center">)

A out of the box backend management system based on the latest version of Nestjs
![例图1](./page.png)
# Description
## Brief introduction
Ruoyi-nest-react is a full stack open source rapid development platform. Implemented code generation,i18n,
Functions such as permission verification, operation log, and dynamic menu.   
Back-end project structure refer to springboot Polymerization project.  
Use controller,service,dao three-layer structure  
More suitable for node full stack developer to use  

Front-end：React18,Umi4,Ant Design Pro 6  
Back-end：Nestjs Monorepo structure  
Third part： Mysql Redis (recommend mysql8+, redis6+)
## Function description
1. User management: The user is the system operator, and this function mainly completes the system user configuration.
2. Department management: Configure the system organization (company, department, team), tree structure to show support data rights.
3. Post management: Configure the position of the system user.
4. Menu management: Configure the system menu, operation permissions, button permissions, etc.
5. Role management: Role menu permission allocation, set roles according to the organization of the data range permission division.
6. Dictionary management: Maintenance of some relatively fixed data frequently used in the system.
7. Parameter management: Dynamically configure common system parameters.
8. Notification bulletin: System notification bulletin information release and maintenance.
9. Operation logs: Record and query normal operation logs of the system. Record and query system exception logs.
10. Login logs: System login logs contain login exceptions.
11. Online users: Monitors the status of active users in the current system.
12. Scheduled tasks: Online task scheduling (add, modify, or delete) includes execution result logs.
13. Code generation: The generation of back-end code (java, html, xml, sql) supports CRUD download.
14. System interface: Automatically generate related api interface documents according to the business code.

## Initialization
（Recommend Node version 18+,Package management tool use pnpm）  

1.Pull project to local

2.Initialize the database, the sql file is divided into Chinese and English, as required

3.Go config/development.js to config mysql and redis

4.pnpm install，and run project
```angular2html
username/password:  admin/admin123
```
5.react-ui is front-end，go into it, and pnpm install and run

nest create new module description:
```angular2html
    1.nest generate app newModule
    2. and go "app.module.ts" and import module
```
![例图1](./structure.png)

## Project picture
<table>
    <tr>
        <td><img src="https://oscimg.oschina.net/oscnet/up-9996b274886e8134066ccee096fde2089dd.png"/></td>
        <td><img src="https://oscimg.oschina.net/oscnet/up-66afe06885d34482862536e4f00c87c0475.png"/></td>
    </tr>    
    <tr>
        <td><img src="https://oscimg.oschina.net/oscnet/up-f279ee4e419e9ba80a77fd898ebd8c9ac45.png"/></td>
        <td><img src="https://oscimg.oschina.net/oscnet/up-b56c891e29d1dfd0213b000339effd256db.png"/></td>
    </tr>
    <tr>
        <td><img src="https://oscimg.oschina.net/oscnet/up-26d4a0f56967f4c319d6e95cab9652bdbfe.png"/></td>
        <td><img src="https://oscimg.oschina.net/oscnet/up-125aed48a8214551cb2ce5aa5a1403d78e9.png"/></td>
    </tr>
    <tr>
        <td><img src="https://oscimg.oschina.net/oscnet/up-59bc1efe5d8f109e56305aa86192ff56bb0.png"/></td>
        <td><img src="https://oscimg.oschina.net/oscnet/up-6e081044a6f864c96df9a25aaa26516f7fc.png"/></td>
    </tr>
	<tr>
        <td><img src="https://oscimg.oschina.net/oscnet/up-ed2e67f41c8a56e0db1215645a0d9dd1e52.png"/></td>
        <td><img src="https://oscimg.oschina.net/oscnet/up-2788241f7893ac8fbfd2b84813f60451755.png"/></td>
    </tr>
	<tr>
        <td><img src="https://oscimg.oschina.net/oscnet/up-eda1770f6383e0001439b56c3392012213d.png"/></td>
        <td><img src="https://oscimg.oschina.net/oscnet/up-31c487d7419b16bc79de0d6a6a12789f048.png"/></td>
    </tr>
    <tr>
        <td><img src="https://oscimg.oschina.net/oscnet/up-31c487d7419b16bc79de0d6a6a12789f048.png"/></td>
        <td><img src="https://oscimg.oschina.net/oscnet/up-4d8cd86ba198f0263f90a0bd36c47b0317b.png"/></td>
    </tr>
	<tr>
        <td><img src="https://oscimg.oschina.net/oscnet/up-6d0ba703a00f8b02a0540931c9e67fe816c.png"/></td>
        <td><img src="https://oscimg.oschina.net/oscnet/up-376159966aa67e7e2fdd971bf68fb0a3375.png"/></td>
    </tr>
</table>
