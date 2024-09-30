import { EntitySubscriberInterface, EventSubscriber, Connection, InsertEvent, UpdateEvent } from "typeorm";
import { AsyncStore } from "apps/common/src/utils/AsyncStore";

@EventSubscriber()
export class TypeOrmOperateEventListener implements EntitySubscriberInterface<any> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }


  beforeInsert(event: InsertEvent<any>) {
    const store = AsyncStore.getStore();
    const user = store ? store.get('user') : null;
    const entityProps = event.metadata.columns.map(item=>item.propertyName)
    if(entityProps.includes("createTime") && !event.entity.createTime){
      event.entity.createTime = new Date();
    }
    if(entityProps.includes("createBy") && !event.entity.createBy && user){
      event.entity.createBy =user.userName;
    }
  }

  beforeUpdate(event: UpdateEvent<any>) {
    const store = AsyncStore.getStore();
    const user = store ? store.get('user') : null;
    const entityProps = event.metadata.columns.map(item=>item.propertyName)
    if(entityProps.includes("updateTime") && !event.entity.updateTime){
      event.entity.updateTime = new Date();
    }
    if(entityProps.includes("updateBy") && !event.entity.updateBy && user){
      event.entity.updateBy =user.userName;
    }

  }

}
