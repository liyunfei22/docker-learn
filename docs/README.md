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

5. 按照国际案例，先跑一个 helloworld

```shell
 sudo systemctl start docker
```

## Docker核心概念

## **Docker** 包括三个基本概念

- **镜像**（`Image`）
**Docker 镜像** 是一个特殊的文件系统，除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（如匿名卷、环境变量、用户等）。镜像 **不包含** 任何动态数据，其内容在构建之后也不会被改变。

- **容器**（`Container`）
镜像（`Image`）和容器（`Container`）的关系，就像是面向对象程序设计中的 `类` 和 `实例` 一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。

容器的实质是进程，但与直接在宿主执行的进程不同，容器进程运行于属于自己的独立的 命名空间 (opens new window)。因此容器可以拥有自己的 root 文件系统、自己的网络配置、自己的进程空间，甚至自己的用户 ID 空间。容器内的进程是运行在一个隔离的环境里，使用起来，就好像是在一个独立于宿主的系统下操作一样。这种特性使得容器封装的应用比直接在宿主运行更加安全。也因为这种隔离的特性，很多人初学 Docker 时常常会混淆容器和虚拟机。

前面讲过镜像使用的是分层存储，容器也是如此。每一个容器运行时，是以镜像为基础层，在其上创建一个当前容器的存储层，我们可以称这个为容器运行时读写而准备的存储层为 容器存储层。

容器存储层的生存周期和容器一样，容器消亡时，容器存储层也随之消亡。因此，任何保存于容器存储层的信息都会随容器删除而丢失。

按照 Docker 最佳实践的要求，容器不应该向其存储层内写入任何数据，容器存储层要保持无状态化。所有的文件写入操作，都应该使用 [数据卷（Volume）](/docker_practice/data_management/volume)、或者 [绑定宿主目录](/docker_practice/data_management/bind-mounts)，在这些位置的读写会跳过容器存储层，直接对宿主（或网络存储）发生读写，其性能和稳定性更高。

- **仓库**（`Repository`）
镜像构建完成后，可以很容易的在当前宿主机上运行，但是，如果需要在其它服务器上使用这个镜像，我们就需要一个集中的存储、分发镜像的服务，[Docker Registry](/docker_practice/repository/registry) 就是这样的服务。

一个 **Docker Registry** 中可以包含多个 **仓库**（`Repository`）；每个仓库可以包含多个 **标签**（`Tag`）；每个标签对应一个镜像。

通常，一个仓库会包含同一个软件不同版本的镜像，而标签就常用于对应该软件的各个版本。我们可以通过 `<仓库名>:<标签>` 的格式来指定具体是这个软件哪个版本的镜像。如果不给出标签，将以 `latest` 作为默认标签。
