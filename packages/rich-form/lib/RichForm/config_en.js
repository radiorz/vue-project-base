
/**
 * richform配置： "设备类型"：{
 *      "要放置的位置":{},
 *      "值"：{}
 * }
 */

const config_en =
 [
  {
   "sickbedhost": {
     "path": "help_call.properties.call_in.properties.__customProps__",
     "value": {
       "type": "object",
       "properties": {
         "desktop": {
           "type": "object",
           "properties": {
             "copyFromNormalCall": {
               "type": "boolean",
               "default": false,
               "readOnly": false,
               "title": "Apply to help call settings",
               "enum": [
                 true,
                 false
               ],
               "enumDict": {
                 "false": {
                   "value": false,
                   "text": "关"
                 },
                 "true": {
                   "value": true,
                   "text": "开"
                 }
               },
               "widget": "switch"
             }
           }
         }
       }
     }
   }
 },
  {
  "sickbedhost": {
    "path": "urgent_call.properties.call_in.properties.__customProps__",
    "value": {
      "type": "object",
      "properties": {
        "desktop": {
          "type": "object",
          "properties": {
            "copyFromNormalCall": {
              "type": "boolean",
              "default": false,
              "readOnly": false,
              "title": "Apply to emergency call settings",
              "enum": [
                true,
                false
              ],
              "enumDict": {
                "false": {
                  "value": false,
                  "text": "关"
                },
                "true": {
                  "value": true,
                  "text": "开"
                }
              },
              "widget": "switch"
            }
          }
        }
      }
    }
  }
 }
]

module.exports = config_en
