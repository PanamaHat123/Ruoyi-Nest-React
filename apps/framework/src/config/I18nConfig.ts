import { AcceptLanguageResolver, I18nModule, QueryResolver } from "nestjs-i18n";
import { join } from "path";

export default I18nModule.forRoot({
  fallbackLanguage: 'zh',
  loaderOptions: {
    path: join(__dirname,'..','..','..','common/src',"i18n"),
    watch: true,
    includeSubfolders:true
  },
  resolvers: [
    { use: QueryResolver, options: ['lang'] },
    AcceptLanguageResolver,
  ]
})