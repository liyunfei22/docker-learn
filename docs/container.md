```shell
 mac@bogon  ~  docker container --help

Usage:  docker container COMMAND

Manage containers

Commands:
  attach      Attach local standard input, output, and error streams to a running container
  commit      Create a new image from a container's changes
  cp          Copy files/folders between a container and the local filesystem
  create      Create a new container
  diff        Inspect changes to files or directories on a container's filesystem
  exec        Run a command in a running container
  export      Export a container's filesystem as a tar archive
  inspect     Display detailed information on one or more containers
  kill        Kill one or more running containers
  logs        Fetch the logs of a container
  ls          List containers
  pause       Pause all processes within one or more containers
  port        List port mappings or a specific mapping for the container
  prune       Remove all stopped containers
  rename      Rename a container
  restart     Restart one or more containers
  rm          Remove one or more containers
  run         Run a command in a new container
  start       Start one or more stopped containers
  stats       Display a live stream of container(s) resource usage statistics
  stop        Stop one or more running containers
  top         Display the running processes of a container
  unpause     Unpause all processes within one or more containers
  update      Update configuration of one or more containers
  wait        Block until one or more containers stop, then print their exit codes

Run 'docker container COMMAND --help' for more information on a command.
```

```shell
docker run 镜像id # 新建容器并启动
docker ps # 列出所有运行的容器 docker container list
docker rm # 容器id 删除指定容器
docker start # 容器id #启动容器
docker restart 容器id #重启容器
docker stop 容器id #停止当前正在运行的容器
docker kill 容器id #强制停止当前容器
```

## 容器操作

[feeeCodeCamp](https://chinese.freecodecamp.org/news/the-docker-handbook/)

```shell
 mac@bogon  ~/daojia/jz-fe-clean/clean-category-mid   dp74  docker ps
CONTAINER ID   IMAGE                 COMMAND                  CREATED              STATUS         PORTS                                   NAMES
f9c05da4f7a1   fhsinchy/hello-dock   "/docker-entrypoint.…"   About a minute ago   Up 3 seconds   0.0.0.0:8088->80/tcp, :::8088->80/tcp   hello-word
 mac@bogon  ~/daojia/jz-fe-clean/clean-category-mid   dp74  docker rname hello-word hello-word2
docker: 'rname' is not a docker command.
See 'docker --help'
 ✘ mac@bogon  ~/daojia/jz-fe-clean/clean-category-mid   dp74  docker rename hello-word hello-word2
 mac@bogon  ~/daojia/jz-fe-clean/clean-category-mid   dp74  docker ps
CONTAINER ID   IMAGE                 COMMAND                  CREATED         STATUS              PORTS                                   NAMES
f9c05da4f7a1   fhsinchy/hello-dock   "/docker-entrypoint.…"   2 minutes ago   Up About a minute   0.0.0.0:8088->80/tcp, :::8088->80/tcp   hello-word2
 mac@bogon  ~/daojia/jz-fe-clean/clean-category-mid   dp74  docker pause hello-word2
hello-word2
 mac@bogon  ~/daojia/jz-fe-clean/clean-category-mid   dp74  docker ps
CONTAINER ID   IMAGE                 COMMAND                  CREATED         STATUS                  PORTS                                   NAMES
f9c05da4f7a1   fhsinchy/hello-dock   "/docker-entrypoint.…"   5 minutes ago   Up 4 minutes (Paused)   0.0.0.0:8088->80/tcp, :::8088->80/tcp   hello-word2
 mac@bogon  ~/daojia/jz-fe-clean/clean-category-mid   dp74  docker unpause hello-word2
hello-word2
 mac@bogon  ~/daojia/jz-fe-clean/clean-category-mid   dp74  docker stop hello-word2
hello-word2
 mac@bogon  ~/daojia/jz-fe-clean/clean-category-mid   dp74  docker start hello-word
Error response from daemon: No such container: hello-word
Error: failed to start containers: hello-word
 ✘ mac@bogon  ~/daojia/jz-fe-clean/clean-category-mid   dp74  docker start hello-word2
hello-word2
```
