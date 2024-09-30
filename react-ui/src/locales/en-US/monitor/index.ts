import job from "./job"
import jobLog from "./job-log"
import logininfor from "./logininfor"
import onlineUser from "./onlineUser"
import operlog from "./operlog"
import server from "./server"


export default {
  ...job,
  ...jobLog,
  ...logininfor,
  ...onlineUser,
  ...operlog,
  ...server,
}
