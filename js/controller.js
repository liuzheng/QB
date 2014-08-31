function ED($scope, $http) {
//    $scope.all = [];
//    $scope.i = 1;
//    $scope.max = 1;
    $scope.base64encode = function () {
        $scope.edoc = btoa(utf16to8($scope.code))
    };
    $scope.base64decode = function () {
        $scope.edoc = utf8to16(atob($scope.code, "UTF-8"))
    };
    $scope.json = function () {
        $http({method: 'GET', url: "http://webinsp.qiushibaike.com/new3/fetch?t=10904"}).
            success(function (data) {
                if (data == []) {
                    return $scope.edoc = [
                        {"context": "数据未获取，稍等片刻刷新"}
                    ]
                }
                $scope.edoc = data;
//        $scope.edoc = JSON.parse($scope.code);
                for (e in $scope.edoc) {
//                    $scope.edoc[e].img = "http://pic.qiushibaike.com/system/pictures/8585/85850371/medium/" + utf8to16(atob($scope.edoc[e].img));
//                    console.log(atob($scope.edoc[e].img));
                    if ($scope.edoc[e].img == "") {
//                        $scope.edoc[e].img = "http://g.search3.alicdn.com/img/bao/uploaded/i4/i4/T13j1kFwBdXXXXXXXX_!!0-item_pic.jpg_210x210.jpg"
                        $scope.edoc[e].img = ""
                    } else {
//                        console.log($scope.edoc[e]);
                        var tmp = atob($scope.edoc[e].img);
                        $scope.edoc[e].img = "http://pic.qiushibaike.com/system/pictures/" + tmp.replace(/[^0-9]/g, "").match(/\d\d\d\d/) + "/" + tmp.replace(/[^0-9]/g, "") + "/medium/" + tmp;
//                        console.log(tmp)
                    }
                    $scope.edoc[e].user_id = "http://www.qiushibaike.com/users/" + $scope.edoc[e].user_id;
                    $scope.edoc[e].content = utf8to16(atob($scope.edoc[e].content));
//            console.log($scope.edoc[e].img)
                }
                $http({method: 'GET', url: $scope.edoc[0].user_id}).
                    success(function (data) {
                        var user = data.match(/<img.*>/g)[1].split('"');
                        $scope.edoc[0].user = user[1];
                        $scope.edoc[0].im = user[5];
                    });
                $http({method: 'GET', url: $scope.edoc[1].user_id}).
                    success(function (data) {
                        var user = data.match(/<img.*>/g)[1].split('"');
                        $scope.edoc[1].user = user[1];
                        $scope.edoc[1].im = user[5];
                    });
                $http({method: 'GET', url: $scope.edoc[2].user_id}).
                    success(function (data) {
                        var user = data.match(/<img.*>/g)[1].split('"');
                        $scope.edoc[2].user = user[1];
                        $scope.edoc[2].im = user[5];
                    });

            });
//        }
        $('body,html').animate({scrollTop: 0}, 200);
    };
    $scope.json();
    $scope.good = function (target) {
        $http({method: 'GET', url: "http://webinsp.qiushibaike.com/new3/inspect2/" + target + "/1?time=8.189"});
        $("#" + target).hide()
    };
    $scope.bad = function (target) {
        $http({method: 'GET', url: "http://webinsp.qiushibaike.com/new3/inspect2/" + target + "/-100?time=8.189"});
        $("#" + target).hide()
    };
    $scope.gun = function (target) {
        $http({method: 'GET', url: "http://webinsp.qiushibaike.com/new3/inspect2/" + target + "/-200?time=8.189"});
        $("#" + target).hide()
    }

}