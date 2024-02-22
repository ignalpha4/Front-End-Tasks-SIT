
let count;
let minute;
let hour;

let interval;


function start_watch(){

    count=0;
    minute=0;
    hour=0;
    interval= setInterval(() => {

        count=count+1;

        if(count>59)
        {
            count=0;

            minute=minute+1;
            
            if(minute>59)
            {
                minute=0;
                hour=hour+1;

                if(hour>24)
                {
                    clearInterval(interval);
                }

                let h=hour < 10 ? "0" + hour : hour ;
                document.querySelector("#hours").textContent=h;
            }

            //same 
            let m=minute<10 ? "0" +minute :minute;
            document.querySelector("#minutes").textContent=m;
            
        }

        //so that the counter will not start with 1 it will start with 01
        let s =count < 10 ? "0"+ count : count;


        document.querySelector("#seconds").textContent=s;


        }, 1000);
    

}

function reset_watch(){
    clearInterval(interval);
    console.log("inside reset");
    document.querySelector("#hours").textContent="00";
    document.querySelector("#minutes").textContent="00";
    document.querySelector("#seconds").textContent="00";

}



