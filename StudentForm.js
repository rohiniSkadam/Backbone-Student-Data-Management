define(['backbone','jquery','underscore','text'],function (Backbone,Underscore,Jquery,Text) {
    var Addstud = Backbone.View.extend({
        el: $("#containerDiv"),
        initialize :function () {
            index=0;
            jsonObj=[];
            this.render();
        },
        events: {
            "click .submitBtn": "validateData",
            "click .searchBtn": "search",
            "click .editBtn" : "editData"
        },
        validateData:function () {
            if ( $('#name').val() ==='' || $('#rollNo').val() ==='' || $('#sub1').val()==='' || $('#sub2').val()===''){
                alert("Please Enter All Details");
            }else {
                this.addStudent();
                $('#name').val("");
                $('#rollNo').val("");
                $('#sub1').val("");
                $('#sub2').val("");
            }
        },
        addStudent : function () {
            var sum=parseInt($('#sub1').val())+ parseInt($('#sub2').val());
            var avg = sum /2;

            jsonObj[index] = new Object();
            jsonObj[index].name =$('#name').val();
            jsonObj[index].rollNo =  $('#rollNo').val();
            jsonObj[index].sub1 =$('#sub1').val();
            jsonObj[index].sub2 =  $('#sub2').val();
            jsonObj[index].avg = avg;

            this.showData(index);
            index ++;
        },
        showData:function (i) {
              $('#studData tbody tr').eq(i).after('<tr><td>'+jsonObj[i].name+
                '</td><td>'+jsonObj[i].rollNo+
                '</td><td>'+jsonObj[i].sub1+
                '</td><td>'+jsonObj[i].sub2+
                '</td><td>'+jsonObj[i].avg+'</td></tr>');
        },
        search:function () {
            var flag=false;
            var op='';
            for(var i=0;i<jsonObj.length;i++){
                if(jsonObj[i].name===$('#name').val()){
                    var rec="Record Found : Below are the details of student <br/>";
                    var studName=jsonObj[i].name;
                    var studRollNo=jsonObj[i].rollNo;
                    var studSub1=jsonObj[i].sub1;
                    var studSub2=jsonObj[i].sub2;
                    var studAvg=jsonObj[i].avg;

                    op=rec+"<br/> Student Name : "+studName+"<br/> Roll No : "+studRollNo+"<br/> Subject 1 : "+studSub1
                        +"<br/> Subject 2 : "+studSub2+"<br/> Average : "+studAvg;

                    $('#rollNo').val(studRollNo);
                    $('#sub1').val(studSub1);
                    $('#sub2').val(studSub2);
                    $("#editBtn").removeAttr("disabled");
                    $("#submitBtn").attr("disabled", "disabled");
                    flag=true;
                }
            }
            if(flag){
                $('#showData').html(op);
            }
            else {
                op="Sorry !! No Records by this name"
                $('#showData').html(op);
            }
        },
        editData:function () {
            for(var i=0;i<jsonObj.length;i++){
                if(jsonObj[i].name=== $('#name').val()) {
                    jsonObj[i].name= $('#name').val();
                    jsonObj[i].rollNo=$('#rollNo').val();
                    jsonObj[i].sub1=$('#sub1').val();
                    jsonObj[i].sub2=$('#sub2').val();
                    var sub1=jsonObj[i].sub1;
                    var sub2=jsonObj[i].sub2;
                    var sum=parseInt(sub1)+ parseInt(sub2);
                    var avg = sum /2;
                    jsonObj[i].avg=avg;
                    this.search();
                    $('#studData').find("tr:eq(" + (i+1) + ")").remove();
                    this.showData(i);
                }
            }
        },
        render:function () {
            $(el).html(this);
        }
       });
    new Addstud();
});