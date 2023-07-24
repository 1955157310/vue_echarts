window.onload=function(){
    var a=10;
    function f1() {
        
        console.log(a);
        a=100 
        console.log(this.a);
        var a
        console.log(this.a);
    }
    f1()
    var length = 1;
    function fn(){
        console.log(this.length);
    }
    var obj={
        lenth:10,
        action:function(callback){
            callback();
            arguments[0]();
        }
    }
    var arr=[1,2,3,4]
    obj.action(fn,...arr)



    var a=10
    function f1(){
        a=100
        var a
        console.log(a)
        console.log(this.a)
    }
    f1()

var a=10
    function f1(){
        console.log(a)
        var a=100
        console.log(a)
        console.log(this.a)
    }
    f1()



















}