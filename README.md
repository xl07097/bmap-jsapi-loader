# 百度地图JSAPI加载器，可以避免多种异步加载API的错误用法

依照高德地图官方 amap-jsapi-loader 修改而成

支持普通 js 和 npm 两种方式加载

```javascript
BMapLoader({
    key: "",
    version: "3.0"  // 默认 2.0 版本
})
    .then(BMap => {
        var map = new BMap.Map("container"); // 创建Map实例
        var point = new BMap.Point(116.404, 39.915); // 创建点坐标
        map.centerAndZoom(point, 15);
         map.enableScrollWheelZoom();
    })
    .catch(e => {
        console.error(e);
    });
```
