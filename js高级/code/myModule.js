function myModule(){
    //私有数据
    var msg = 'ajEofFaiWQ';
    //操作数据的函数
    function showSomething(){
        console.log('showSomething()'+msg.toUpperCase());
    }

    function showOtherthing(){
        console.log('showOtherthing()'+msg.toLowerCase());
    }

    //向外暴露对象（给外部使用的方法）
    return {
        showSomething:showSomething,
        showOtherthing:showOtherthing
    }
}