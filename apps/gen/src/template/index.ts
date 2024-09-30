
import {entityTem} from './nestjs/entity.js'
import {dtoTem} from './nestjs/dto.js'
import {controllerTem} from './nestjs/controller.js'
import {moduleTem} from './nestjs/module.js'
import {serviceTem} from './nestjs/service.js'
import { daoTem } from "./nestjs/dao";
import { reqTem } from "./nestjs/req";
import { reactServiceTem } from "./react/service";
import { reactTypesTem } from "./react/types";
import { reactIndexTem } from "./react";
import { reactEditTem } from "./react/edit";
import { menuSqlTem } from "./sql/menu.sql";
import { i18nTem } from "./react/i18n";

const templates = {
    'tool/template/nestjs/entity.ts.vm': entityTem,
    'tool/template/nestjs/dto.ts.vm': dtoTem,
    'tool/template/nestjs/req.ts.vm': reqTem,
    'tool/template/nestjs/controller.ts.vm': controllerTem,
    'tool/template/nestjs/dao.ts.vm': daoTem,
    'tool/template/nestjs/service.ts.vm': serviceTem,
    'tool/template/nestjs/module.ts.vm': moduleTem,
    // 'tool/template/vue/api.js.vm': apiTempalte,
    // 'tool/template/vue/indexVue.vue.vm': indexVue,
    // 'tool/template/vue/dialogVue.vue.vm': dialogVue,
    'tool/template/react/service.ts.vm': reactServiceTem,
    'tool/template/react/types.ts.vm': reactTypesTem,
    'tool/template/react/index.ts.vm': reactIndexTem,
    'tool/template/react/edit.ts.vm': reactEditTem,
    'tool/template/react/i18n.zh.ts.vm': i18nTem,
    'tool/template/react/i18n.en.ts.vm': i18nTem,
    'tool/template/sql/menu.sql.ts.vm': menuSqlTem,
};

export const index = (options) => {
    const result = {};
    for (const [path, templateFunc] of Object.entries(templates)) {
        result[path] = templateFunc(options);
    }
    return result;
};
