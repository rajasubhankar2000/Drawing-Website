$(function(){
   
    let paint =false;
    let paint_erase = "paint";
    let canvas = document.getElementById("paint")

    let ctx =canvas.getContext('2d');
    var container = $("#container");
    let mouse={x:0,y:0};
    if(localStorage.getItem("imgCanvas")!=null){
        let img=new Image();
        img.onload =function(){
            ctx.drawImage(img,0,0);

        }
        img.src=localStorage.getItem("imgCanvas")
    };
    
    ctx.lineWidth =3;
    ctx.lineJoin='round';
    ctx.lineCap ='round';
    container.mousedown(function(e){
        paint=true;
        // window.alert(paint);
        ctx.beginPath();
        mouse.x=e.pageX - this.offsetLeft;
        mouse.y=e.pageY - this.offsetTop;

        ctx.moveTO(mouse.x,mouse.y)
    });

    container.mousemove(function(e){
        mouse.x=e.pageX - this.offsetLeft;
        mouse.y=e.pageY - this.offsetTop;
        if(paint==true){
            if(paint_erase=="paint"){
                // get color input
                ctx.strokeStyle =$("#paintcolor").val();


            }
            else{
                ctx.strokeStyle ="white";
            }
            ctx.lineTo(mouse.x,mouse.y);
            ctx.stroke();
        }
    });
    container.mouseup(function(){
        paint=false;

    });
    container.mouseleave(function(){
        paint=false;

    });
    //click th reset button
    $("#reset").click(function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        paint_erase="paint";
        $("#erase").removeClass("eraseMode")
    })
    //click the save button
    $("#save").click(function(){
        if(typeof(localStorage)!=null){
            localStorage.setItem("imgCanvas",canvas.toDataURL());
            // window.alert
            // (localStorage.getItem("imgCanvas"));
        }else{
            window.alert("your browser doed not support local storage")
        }
    });
    //click the erase button
    $("#erase").click(function(){
      if(paint_erase=="paint"){
          paint_erase="erase";
      } 
      else
      {
          paint_erase ="paint"
          $("#erase").removeClass("eraseMode");
      }
      $(this).toggleClass("eraseMode");
    })

    //change color input
    $("#paintcolor").change(function(){
        $("#circle").css("background-color",$(this).val());
    })

    //change linewidth using slider
    $("#slider").slider({
        min:3,
        max:30,
        slide:function(event,ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            ctx.lineWidth= ui.value;

        }

    });


//canvas

    // var canvas=document.getElementById("paint");
    // var context=canvas.getContext("2d");

    // //draw a line
    // //declaring new path
    // context.beginPath();
    // //set line width
    // context.lineWidth =40;
    // //set line color
    // context.strokeStyle='#42e565';
    // // 
    // //position the context point
    // context.moveTo(50,50);
    
    // //set cap to the line (round , butt ,square)
    // context.lineCap="round";
    // //set line join style(bevel ,round,miter)
    // context.lineJoin='round';
    // //draw a straight line from starting point to a new position
    // context.lineTo(200,200);
    // //draw anothe line
    // context.lineTo(400,100);
    // //make line visble
    // context.stroke();
});