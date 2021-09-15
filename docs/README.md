# docker [官网](https://www.docker.com/)

## 什么是docker

**Docker 属于 Linux 容器的一种封装，提供简单易用的容器使用接口。** 它是目前最流行的 Linux 容器解决方案。

和虚拟化技术类似，它极大的方便了应用服务的部署；又与虚拟化技术不同，它以一种更轻量的方式实现了应用服务的打包。使用 `Docker` 可以让每个应用彼此相互隔离，在同一台机器上同时运行多个应用，不过他们彼此之间共享同一个操作系统。`Docker` 的优势在于，它可以在更细的粒度上进行资源的管理，也比虚拟化技术更加节约资源。

### 历史

2010 年，几个搞 IT 的年轻人，在美国旧金山成立了一家名叫 dotCloud 的公司。dotCloud 的平台即服务（Platform-as-a-Service, PaaS）提供商。底层技术上，dotCloud 平台利用了 Linux 的 LXC 容器技术。

>Linux Container容器是一种内核虚拟化技术，可以提供轻量级的虚拟化，以便隔离进程和资源。

为了方便创建和管理这些容器，dotCloud 基于 Google 公司推出的 Go 语言开发了一套内部工具，之后被命名为 Docker。Docker 就是这样诞生的。

2013 年 3 月，自己养不活，就吃“百家饭”，开源。

越来越多的人发现docker的优点！火了。Docker每个月都会更新一个版本！

### docker 优势

**（1）更高效的利用系统资源** 相比虚拟机技术，一个相同配置的主机，往往可以运行更多数量的应用。

**（2）更快速的启动时间。** 传统的虚拟机技术启动应用服务往往需要数分钟，而 `Docker` 容器应用，由于直接运行于宿主内核，无需启动完整的操作系统，因此可以做到秒级、甚至毫秒级的启动时间。

**（3）一致的运行环境。** `Docker` 的镜像提供了除内核外完整的运行时环境，确保了应用运行环境一致性，从而不会再出现 *「这段代码在我机器上没问题啊」* 这类问题。。

**（4）持续交付和部署。**  使用 `Docker` 可以通过定制应用镜像来实现持续集成、持续交付、部署。

下面的图片比较了 Docker 和传统虚拟化方式的不同之处。传统虚拟机技术是虚拟出一套硬件后，在其上运行一个完整操作系统，在该系统上再运行所需应用进程；而容器内的应用进程直接运行于宿主的内核，容器内没有自己的内核，而且也没有进行硬件虚拟。因此容器要比传统虚拟机更为轻便。
![docker](/images/duibi.png)

## docker 安装

### mac

[MAC 安装 docker](https://docs.docker.com/desktop/mac/install/)
![mac](/images/mac-install.png)

### linux `centos7`

[centos7 安装 docker](https://docs.docker.com/engine/install/centos/)

1. 卸载当前已经存在的旧版 `Docker`

``` shell
 sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

2. 添加`Docker`安装源

```shell
 sudo yum install -y yum-utils
 sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

3. 安装最新版本

  ```shell
   sudo yum install docker-ce docker-ce-cli containerd.io
  ```

如果需要安装指定版本，可以通过下面命令查看版本并选择需要的版本

```shell
yum list docker-ce --showduplicates | sort -r
```

  ```shell
   sudo yum install docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING> containerd.io
  ```

4. 安装完成，启动Docker

```shell
 sudo systemctl start docker
 ```

5. 先跑一个 helloworld

```shell
$ docker run hello-world

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
 ```

卸载 Docker

```shell
#1. 卸载依赖
yum remove docker-ce docker-ce-cli containerd.io
#2. 删除资源
rm -rf /var/lib/docker
# /var/lib/docker 是docker的默认工作目录
```

## Docker核心概念

- **镜像**（`Image`）
**Docker 镜像** 是一个特殊的文件系统，除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（如匿名卷、环境变量、用户等）。镜像 **不包含** 任何动态数据，其内容在构建之后也不会被改变。

- **容器**（`Container`）
镜像（`Image`）和容器（`Container`）的关系，就像是面向对象程序设计中的 `类` 和 `实例` 一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。

> 容器的实质是进程，但与直接在宿主执行的进程不同，容器进程运行于属于自己的独立的 命名空间 (opens new window).

> 因此容器可以拥有自己的 root 文件系统、自己的网络配置、自己的进程空间，甚至自己的用户 ID 空间。容器内的进程是运行在一个隔离的环境里，使用起来，就好像是在一个独立于宿主的系统下操作一样。这种特性使得容器封装的应用比直接在宿主运行更加安全。也因为这种隔离的特性，很多人初学 Docker 时常常会混淆容器和虚拟机。

>前面讲过镜像使用的是分层存储，容器也是如此。每一个容器运行时，是以镜像为基础层，在其上创建一个当前容器的存储层，我们可以称这个为容器运行时读写而准备的存储层为 容器存储层。
>容器存储层的生存周期和容器一样，容器消亡时，容器存储层也随之消亡。因此，任何保存于容器存储层的信息都会随容器删除而丢失。
> 按照 Docker 最佳实践的要求，容器不应该向其存储层内写入任何数据，容器存储层要保持无状态化。所有的文件写入操作，都应该使用 [数据卷（Volume）](/docker_practice/data_management/volume)、或者 [绑定宿主目录](/docker_practice/data_management/bind-mounts)，在这些位置的读写会跳过容器存储层，直接对宿主（或网络存储）发生读写，其性能和稳定性更高。

- **仓库**（`Repository`）
镜像构建完成后，可以很容易的在当前宿主机上运行，但是，如果需要在其它服务器上使用这个镜像，我们就需要一个集中的存储、分发镜像的服务，[Docker Registry](/docker_practice/repository/registry) 就是这样的服务。

一个 **Docker Registry** 中可以包含多个 **仓库**（`Repository`）；每个仓库可以包含多个 **标签**（`Tag`）；每个标签对应一个镜像。
通常，一个仓库会包含同一个软件不同版本的镜像，而标签就常用于对应该软件的各个版本。我们可以通过 `<仓库名>:<标签>` 的格式来指定具体是这个软件哪个版本的镜像。如果不给出标签，将以 `latest` 作为默认标签。

仓库名经常以 两段式路径 形式出现，比如 jwilder/nginx-proxy，前者往往意味着 Docker Registry 多用户环境下的用户名，后者则往往是对应的软件名。
![cangku](/images/cangku.png)s

## docker 是怎样工作的

## Docker基础命令操作

[文档](https://docs.docker.com/engine/reference/commandline/version/)

```shell
docker version #显示docker的版本信息。
docker info #显示docker的系统信息，包括镜像和容器的数量
```

### 查看帮助命令

```shell
# docker [命令] --help
$ docker pull --help
```
```shell
Usage:  docker pull [OPTIONS] NAME[:TAG|@DIGEST]

Pull an image or a repository from a registry

Options:
  -a, --all-tags                Download all tagged images in the repository
      --disable-content-trust   Skip image verification (default true)
      --platform string         Set platform if server is multi-platform capable
  -q, --quiet                   Suppress verbose output

```

## docker镜像相关操作

Docker 运行容器前需要本地存在对应的镜像，如果本地不存在该镜像，Docker 会从镜像仓库下载该镜像。
```shell
docker search # 搜索镜像
docker pull #下载镜像 docker image pull
docker images # 查看所有本地主机上的镜像 docker image ls
docker rmi # 删除镜像 docker image rm
```
### 搜索官方仓库镜像

```shell
docker search centos

NAME                       DESCRIPTION                                     STARS     `OFFICIAL` AUTOMATED
centos                     The official build of CentOS.                   6753      `[OK]`
ansible/centos7-ansible    Ansible on Centos7                              134                  [OK]
consol/centos-xfce-vnc     Centos container with "headless" VNC session…   130                  [OK]
```

### 拉取镜像

命令：```$ docker pull  [Docker Registry 地址[:端口号]/]仓库名[:标签]```

说明：

- Docker 镜像仓库地址：地址的格式一般是 <域名/IP>[:端口号]。默认地址是 Docker Hub(docker.io)。
- 仓库名：如之前所说，这里的仓库名是两段式名称，即 <用户名>/<软件名>。对于 Docker Hub，如果不给出用户名，则默认为 library，也就是官方镜像。

```shell
$ docker pull centos
Using default tag: latest
latest: Pulling from library/centos
Digest: sha256:5528e8b1b1719d34604c87e11dcd1c0a20bedf46e83b5632cdeac91b8c04efc1
Status: Image is up to date for centos:latest
docker.io/library/centos:latest
```

### 查看当前主机的镜像列表

``` docker image ls ```  
``` docker images ```

```shell
$ docker images
REPOSITORY                        TAG       IMAGE ID       CREATED             SIZE
fourtharsenal/docker101tutorial   latest    f82bbbe08672   About an hour ago   28.3MB
docker101tutorial                 latest    f82bbbe08672   About an hour ago   28.3MB
mysql                             5.7       1d7aba917169   12 days ago         448MB
mysql                             latest    0716d6ebcc1a   12 days ago         514MB
alpine/git                        latest    b8f176fa3f0d   3 months ago        25.1MB
hello-world                       latest    d1165f221234   6 months ago        13.3kB
centos                            latest    300e315adb2f   9 months ago        209MB
```

列表包含了 `仓库名`、`标签`、`镜像` `ID`、`创建时间` 以及 `所占用的空间`。
>列表中的镜像体积总和并非是所有镜像实际硬盘消耗。由于 Docker 镜像是多层存储结构，并且可以继承、复用，因此不同镜像可能会因为使用相同的基础镜像，从而拥有共同的层。由于 Docker 使用 Union FS，相同的层只需要保存一份即可，因此实际镜像硬盘占用空间很可能要比这个列表镜像大小的总和要小的多。

- 镜像体积查看```docker system df```
- 显示镜像摘要：```docker image ls --digests```

#### 删除本地镜像

```docker rmi <镜像1> [<镜像2> ...]```
`<镜像>` 可以是 `镜像ID`、`镜像名` 或者 `镜像摘要`

```shell
$ docker rmi mysql:5.7
Untagged: mysql:5.7
Untagged: mysql@sha256:d9b934cdf6826629f8d02ea01f28b2c4ddb1ae27c32664b14867324b3e5e1291
Deleted: sha256:1d7aba9171693947d53f474014821972bf25d72b7d143ce4af4c8d8484623417
Deleted: sha256:94ebbead5c58282fef91cc7d0fb56e4006a72434b4a6ae2cd5be98f369cb8c21
Deleted: sha256:989da5efad29ec59bd536cd393d277bc777f8b9b34b8e3ad9593a4b0a83b40f4
Deleted: sha256:7457ee6817c678da3cb383d27a3d79d5f3f25fbcb92958d5e8d5709e7631e23c
Deleted: sha256:fe7dac53adebe33519b4e4fc577bfcddd7372cc313c35fae681fc82fb325fdc0

```

删除所有镜像

```
docker rmi $(docker image ls -q)
```

### docker commit

```shell
# 运行nginx容器
docker run --name webserver -d -p 8088:80 nginx

Unable to find image 'nginx:latest' locally
latest: Pulling from library/nginx
a330b6cecb98: Already exists
e0ad2c0621bc: Pull complete
9e56c3e0e6b7: Pull complete
09f31c94adc6: Pull complete
32b26e9cdb83: Pull complete
20ab512bbb07: Pull complete
Digest: sha256:853b221d3341add7aaadf5f81dd088ea943ab9c918766e295321294b035f3f3e
Status: Downloaded newer image for nginx:latest
832d6b416cd5e95fb8c46ce8003b6e36920980616016fb35bebbf64b7d31c9a9
# 修改主页文件
docker exec -it webserver bash
root@832d6b416cd5:/# echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html
root@832d6b416cd5:/# exit
exit
# 将容器保存为镜像
docker commit \
    --author "liyunfei" \
    --message "修改了默认网页" \
    webserver \
    nginx:v2
sha256:2452bc85ddba878a34a4fd1b6061b763a934d782f347e221d29559d9ec461deb
# 查看镜像
docker images
REPOSITORY                        TAG       IMAGE ID       CREATED         SIZE
nginx                             v2        2452bc85ddba   7 seconds ago   133MB
fourtharsenal/docker101tutorial   latest    f82bbbe08672   2 hours ago     28.3MB
docker101tutorial                 latest    f82bbbe08672   2 hours ago     28.3MB
nginx                             latest    ad4c705f24d3   5 days ago      133MB
mysql                             latest    0716d6ebcc1a   12 days ago     514MB
alpine/git                        latest    b8f176fa3f0d   3 months ago    25.1MB
hello-world                       latest    d1165f221234   6 months ago    13.3kB
centos                            latest    300e315adb2f   9 months ago    209MB
# 查看修改历史
docker history nginx:v2
IMAGE          CREATED          CREATED BY                                      SIZE      COMMENT
2452bc85ddba   39 seconds ago   nginx -g daemon off;                            1.19kB    修改了默认网页
ad4c705f24d3   5 days ago       /bin/sh -c #(nop)  CMD ["nginx" "-g" "daemon…   0B
<missing>      5 days ago       /bin/sh -c #(nop)  STOPSIGNAL SIGQUIT           0B
<missing>      5 days ago       /bin/sh -c #(nop)  EXPOSE 80                    0B
<missing>      5 days ago       /bin/sh -c #(nop)  ENTRYPOINT ["/docker-entr…   0B
<missing>      5 days ago       /bin/sh -c #(nop) COPY file:09a214a3e07c919a…   4.61kB
<missing>      5 days ago       /bin/sh -c #(nop) COPY file:0fd5fca330dcd6a7…   1.04kB
<missing>      5 days ago       /bin/sh -c #(nop) COPY file:0b866ff3fc1ef5b0…   1.96kB
<missing>      5 days ago       /bin/sh -c #(nop) COPY file:65504f71f5855ca0…   1.2kB
<missing>      5 days ago       /bin/sh -c set -x     && addgroup --system -…   64MB
<missing>      5 days ago       /bin/sh -c #(nop)  ENV PKG_RELEASE=1~buster     0B
<missing>      5 days ago       /bin/sh -c #(nop)  ENV NJS_VERSION=0.6.2        0B
<missing>      5 days ago       /bin/sh -c #(nop)  ENV NGINX_VERSION=1.21.3     0B
<missing>      12 days ago      /bin/sh -c #(nop)  LABEL maintainer=NGINX Do…   0B
<missing>      12 days ago      /bin/sh -c #(nop)  CMD ["bash"]                 0B
<missing>      12 days ago      /bin/sh -c #(nop) ADD file:4ff85d9f6aa246746…   69.3MB
# 运行nginx:v2 镜像
docker run --name web2 -d -p 8089:80 nginx:v2
```

![image](/images/image.png)

### 配置镜像加速

对于使用 macOS 的用户，在任务栏点击 Docker Desktop 应用图标 -> Perferences，在左侧导航菜单选择 Docker Engine，在右侧像下边一样编辑 json 文件。修改完成之后，点击 Apply & Restart 按钮，Docker 就会重启并应用配置的镜像地址了。

***mac***

```shell
{
  "registry-mirrors": [
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com"
  ]
}
```

## docker 容器相关操作
```shell
docker run 镜像id # 新建容器并启动
docker ps # 列出所有运行的容器 docker container list
docker rm # 容器id 删除指定容器
docker start # 容器id #启动容器
docker restart 容器id #重启容器
docker stop 容器id #停止当前正在运行的容器
docker kill 容器id #强制停止当前容器
```

## REPOSITORY
