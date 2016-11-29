export default function GMTtoTime(value){  
        if(value=="" || value==null){  
            return "";  
        }  
        else{  
            var tempValue = value.replace("T", " ");  
            var dateBefore = tempValue.slice(0,10);  
  
            var timeBefore = tempValue.slice(11,19);  
            var dateArray = dateBefore.split("-");  
            var timeArray = timeBefore.split(":");  
            //注意，Date对象中的getMonth() 返回0~11  
  
            var feedDate = Date.UTC(dateArray[0],dateArray[1]-1,dateArray[2],timeArray[0],timeArray[1],timeArray[2],0) + 8*60*60;  
            var now = new Date();  
            now.setTime(feedDate);  
  
            if (now.getMonth()<10){  
                var m=0;  
                m=now.getMonth()+1;  
                var month = "0" + m;  
            }else{  
                var month = now.getMonth()+1;  
            }  
  
            if (now.getDate()<10){  
                var d=0;  

                //更改日期多一天问题
                //d=now.getDate()+1; 
                d=now.getDate(); 
                var date = "0" + d;  
            }else{  
                var date = now.getDate();  
            }  
            var dateAfter = now.getFullYear() + "-" + month + "-" + date;  
            //                var dateAfter = month + "月" + date + "日";  
  
            if (now.getHours()<10){  
                var hour = "0" + now.getHours();  
            }else{  
                var hour = now.getHours();  
            }  
  
            if (now.getMinutes()<10){  
                var minute = "0" + now.getMinutes();  
            }else{  
                var minute = now.getMinutes();  
            }  
            var timeAfter = hour + ":" + timeArray[1]+":"+timeArray[2];  
            //更改只显示日期不显示时间
            // var timeFinal = dateAfter + "  " + timeAfter; 
            var  timeFinal = dateAfter;
            return timeFinal;  
        }  
    }