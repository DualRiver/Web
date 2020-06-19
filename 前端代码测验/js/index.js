window.onload = function () {

    var navList = document.getElementsByClassName('nav_list')[0].getElementsByTagName('li');
    var index = 0;  // 当前显示标签的下标，也是上一个导航下标
    
    for (var key = 0; key < navList.length; key ++) {
        navList[key].setAttribute('index', key)
        navList[key].onmousemove = function () {
            // 移除上一个导航的样式
            navList[index].className = ''
            this.className = 'active'
            // 当前显示标签的下标，也是上一个导航下标
            index = this.getAttribute('index')
        }
    }



    var items= document.getElementsByClassName('item');//图片
    var points=document.getElementsByClassName('point');//点
    var goPreBtn=document.getElementById('goPre');
    var goNextBtn=document.getElementById('goNext');
 
    var time =0;//定时器图片跳转参数
    var index=0;//表示第几张图片在展示  ---第index张图片有active这个类名
    var clearActive=function(){
           for(var i=0;i<items.length;i++){
               items[i].className='item';
          }
          for(var i=0;i<points.length;i++){
             points[i].className='point';
          }
         }
 
    var goIndex=function(){
         clearActive();
         points[index].className='point active';
         items[index].className='item active';
    }
    var goNext =function(){
        if(index<4){
             index++;
        }else{
            index=0;
        }
          
            goIndex();
        }
 
             var goPre=function(){
                 if(index==0){
                     index=4;
                 }else{
                     index--;
                 }
                 goIndex();
             }
 
        goNextBtn.addEventListener('click',function(){
                 goNext();
        })
       goPreBtn.addEventListener('click',function(){
             goPre();
       })
     
   for(var i=0;i<points.length ; i++){
         points[i].addEventListener('click',function(){
         var pointIndex=this.getAttribute('data-index');
         index=pointIndex;
         goIndex();
         time=0;
         })
 }
     setInterval(function(){
         time++;
         if(time==20){
             goNext();
              time=0;
     }
     },100)


    // 封装ajax请求
    function Ajax (type, url, fun) {
        var ajax = new XMLHttpRequest()
        ajax.open('get', url, true)
        ajax.send()
        ajax.onreadystatechange = function () {
            if (ajax.status == 200 && ajax.readyState == 4) {

                // 因为返回的数据是字符串格式，需要转换成JSON
                var result = JSON.parse(ajax.responseText).data
               
                fun (result)

            }
        }
    }

    // 线状图
    // 基于准备好的dom，初始化echarts实例
    var lineChart = echarts.init(document.getElementById('line'));
    // 指定图表的配置项和数据

    var lineOption = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        title: {
            left: 'center',
            text: '曲线图数据展示',
            textStyle:{
        　　　　 fontSize:24
            }
        },
       
        xAxis: {
            type: 'category',
            boundaryGap: false
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} 人'
            },
        },
        series: [
            {
                name: '模拟数据',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: 'rgb(96, 148, 240)'
                },
                areaStyle: {
                    color:'rgb(243, 245, 254)'
                    
                }
            }
        ]
    };

    function lineFun (result) {
        // 修改数据
        lineOption['xAxis']['data'] = result['xAxis']
        lineOption['series'][0]['data'] = result['series']

        // 使用刚指定的配置项和数据显示图表。
        lineChart.setOption(lineOption);
    }

    // 饼状图
    // 基于准备好的dom，初始化echarts实例
    var cakeChart = echarts.init(document.getElementById('cake'));
    // 指定图表的配置项和数据

    var cakeOption = {
        title: {
            text: '饼状数据展示',
            left: 'center',
            textStyle:{
        　　　　 fontSize: 24
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    {value: 335, name: '直接访问'},
                    {value: 310, name: '邮件营销'},
                    {value: 234, name: '联盟广告'},
                    {value: 135, name: '视频广告'},
                    {value: 1548, name: '搜索引擎'}
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    function cakeFun (result) {
        // 修改数据
        
        for (var i = 0; i < result['xAxis'].length; i ++) {
            cakeOption['series'][0]['data'][i] = {
                value: result['series'][i], 
                name: result['xAxis'][i]
            }
        }

        // 使用刚指定的配置项和数据显示图表。
        cakeChart.setOption(cakeOption);
    }


    // 矩形图
    // 基于准备好的dom，初始化echarts实例
    var rectangleChart = echarts.init(document.getElementById('rectangle'));
    // 指定图表的配置项和数据

    var rectangleOption = {
        color: ['#3398DB'],
        title: {
            text: '柱状数据展示',
            left: 'center',
            textStyle:{
        　　　　 fontSize: 24
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '直接访问',
                type: 'bar',
                barWidth: '60%',
                data: [10, 52, 200, 334, 390, 330, 220]
            }
        ]
    };

    function rectangleFun (result) {
        // 修改数据
        rectangleOption['xAxis']['data'] = result['xAxis']
        rectangleOption['series'][0]['data'] = result['series']

        // 使用刚指定的配置项和数据显示图表。
        rectangleChart.setOption(rectangleOption);
    }

    
    // 请求线状图数据 并渲染
    Ajax('get', 'https://edu.telking.com/api/?type=month', lineFun)
    // 请求饼状图数据 并渲染
    Ajax('get', 'https://edu.telking.com/api/?type=week', cakeFun)
    // 请求柱状图数据 并渲染
    Ajax('get', 'https://edu.telking.com/api/?type=week', rectangleFun)

   

 
}