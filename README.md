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
![例图1](https://raw.githubusercontent.com/PanamaHat123/images/refs/heads/master/ruoyi_nest_react/page.png)
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
![例图1](https://raw.githubusercontent.com/PanamaHat123/images/refs/heads/master/ruoyi_nest_react/structure.png)

## Project picture
<table>
    <tr>
        <td><img src="https://raw.githubusercontent.com/PanamaHat123/images/refs/heads/master/ruoyi_nest_react/p1.png"/></td>
        <td><img src="https://raw.githubusercontent.com/PanamaHat123/images/refs/heads/master/ruoyi_nest_react/p1-1.png"/></td>
    </tr>    
    <tr>
        <td><img src="https://raw.githubusercontent.com/PanamaHat123/images/refs/heads/master/ruoyi_nest_react/p2.png"/></td>
        <td><img src="https://raw.githubusercontent.com/PanamaHat123/images/refs/heads/master/ruoyi_nest_react/p2-2.png"/></td>
    </tr>
    <tr>
        <td><img src="https://raw.githubusercontent.com/PanamaHat123/images/refs/heads/master/ruoyi_nest_react/p3.png"/></td>
        <td><img src="https://raw.githubusercontent.com/PanamaHat123/images/refs/heads/master/ruoyi_nest_react/p3-3.png"/></td>
    </tr>
    <tr>
        <td><img src="https://raw.githubusercontent.com/PanamaHat123/images/refs/heads/master/ruoyi_nest_react/p4.png"/></td>
        <td><img src="https://raw.githubusercontent.com/PanamaHat123/images/refs/heads/master/ruoyi_nest_react/p5.png"/></td>
    </tr>
	<tr>
        <td><img src="https://raw.githubusercontent.com/PanamaHat123/images/refs/heads/master/ruoyi_nest_react/p6.png"/></td>
        <td><img src="https://raw.githubusercontent.com/PanamaHat123/images/refs/heads/master/ruoyi_nest_react/p7.png"/></td>
    </tr>
	<tr>
        <td><img src="https://raw.githubusercontent.com/PanamaHat123/images/refs/heads/master/ruoyi_nest_react/p8.png"/></td>
        <td><img src="https://raw.githubusercontent.com/PanamaHat123/images/refs/heads/master/ruoyi_nest_react/p9.png"/></td>
    </tr>
    <tr>
        <td><img src="https://raw.githubusercontent.com/PanamaHat123/images/refs/heads/master/ruoyi_nest_react/p10.png"/></td>
        <td><img src="https://raw.githubusercontent.com/PanamaHat123/images/refs/heads/master/ruoyi_nest_react/p11.png"/></td>
    </tr>
    <tr>
        <td><img src="https://raw.githubusercontent.com/PanamaHat123/images/refs/heads/master/ruoyi_nest_react/p12.png"/></td>
        <td><img src="https://raw.githubusercontent.com/PanamaHat123/images/refs/heads/master/ruoyi_nest_react/p13.png"/></td>
    </tr>
    <tr>
        <td><img src="https://raw.githubusercontent.com/PanamaHat123/images/refs/heads/master/ruoyi_nest_react/p14.png"/></td>
        <td><img src="https://raw.githubusercontent.com/PanamaHat123/images/refs/heads/master/ruoyi_nest_react/p15.png"/></td>
    </tr>
</table>
