export interface Program {
    title: string;
    code: string;
}

export const programs: Record<string, Program> = {
    "p1a.c": {
        title: "p1a",
        code: String.raw`#include<stdio.h>
#include<fcntl.h>
#include<unistd.h>
int main(){
	char file[20], ch;
	int fd,size,i;
	printf("Enter the filename:");
	scanf("%s", file);
	fd = open(file,O_RDONLY);

	if(fd < 0){
		printf("File not found");
		return 0;
	}
	size = lseek(fd, 0, SEEK_END);
	printf("Reverse Content:\n");
	
	for(int i=size-1; i>=0;i--){
		lseek(fd, i, SEEK_SET);
		read(fd, &ch, 1);
		printf("%c", ch);
	}
	close(fd);
}`,
    },
    "p1b.c": {
        title: "p1b",
        code: String.raw`#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<fcntl.h>
#include<sys/wait.h>

int main()
{
	int fd;
	pid_t pid;
	char file[20], buffer[10];
	
	printf("Enter the filename:");
	scanf("%s",file);
	fd = open(file, O_RDONLY);

	if(pid == -1)
	{
		perror("open");
		return 1;
	}

	pid = fork();

	if(pid == -1)
	{
		perror("fork");
		return 1;
	}
	else if(pid == 0)
	{
		read(fd, buffer, 5);
		buffer[5]  = '\0';

		printf("Child process: %s\n", buffer);
	}
	else{
		wait(NULL);
		read(fd,buffer,5);
		buffer[5] = '\0';
		printf("Parent process: %s\n", buffer);
	}
	close(fd);
	return 0;
}`,
    },
    "p2a.c": {
        title: "p2a",
        code: String.raw`#include<stdio.h>
#include<sys/stat.h>
#include<time.h>

int main()
{
	struct stat s;
	char file[20];

	printf("Enter the filename:");
	scanf("%s",file);

	if(stat(file, &s) == -1)
	{
		printf("File not found");
		return 0;
	}

	printf("\nFile Name         :  %s\n", file);
	printf("File Size         : %ld bytes\n", s.st_size);
	printf("Permissions       : %o\n" , s.st_mode & 0777);
	printf("Number of links   : %ld\n", s.st_nlink);
	printf("Owner UID         : %d\n", s.st_uid);
	printf("Owner GID         : %d\n", s.st_gid);
	printf("Last Access Time  : %s",ctime(&s.st_atime));

	return 0;
}`,
    },
    "p2b.c": {
        title: "p2b",
        code: String.raw`#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<sys/wait.h>
#include<sys/types.h>

int my_sys(const char *cm)
{
    if(cm == NULL)
        return -1;

    pid_t pid = fork();

    if(pid == -1)
    {
        printf("Fork Error\n");
        return -1;
    }
    else if(pid == 0)
    {
        execl("/bin/sh", "sh", "-c", cm, (char *)NULL);

        printf("Exec Error\n");
        exit(1);
    }
    else
    {
        int st;

        if(waitpid(pid, &st, 0) == -1)
            return -1;

        if(WIFEXITED(st))
            return WEXITSTATUS(st);
        else
            return -1;
    }
}

int main()
{
    int res;

    printf("Executing ls -li\n");

    res = my_sys("ls -li");

    if(res == -1)
        printf("Error\n");
    else
        printf("Exited with status %d\n", res);

    return 0;
}`,
    },
    "p3a.c": {
        title: "p3a",
        code: String.raw`#include<stdio.h>
#include<dirent.h>
#include<unistd.h>
#include<string.h>
#include<fcntl.h>

int main(int argc,char *argv[])
{
    DIR *d;
    struct dirent *p;
    char path[100];
    int fd;
    int size;

    d = opendir(argv[1]);

    while((p = readdir(d)) != NULL)
    {
        if(strcmp(p->d_name,".")==0 || strcmp(p->d_name,"..")==0)
            continue;

        sprintf(path,"%s/%s",argv[1],p->d_name);

        fd = open(path,O_RDONLY);

        size = lseek(fd,0,SEEK_END);

        if(size==0)
        {
            unlink(path);
            printf("Removed empty file: %s\n",path);
        }

        close(fd);
    }

    closedir(d);
}`,
    },
    "p3b.c": {
        title: "p3b",
        code: String.raw`#include<stdio.h>
#include<dirent.h>
#include<sys/stat.h>
#include<time.h>
#include<fcntl.h>
#include<string.h>

int main(int argc, char *argv[])
{
	DIR *dp;
	struct dirent *d;
	struct stat m;
	char *dir;
	char path[100];

	dir = (argc > 1) ? argv[1] : ".";
	dp = opendir(dir);

	if(dp == NULL)
	{
		printf("Cannot open directory");
		return 0;
	}

	while((d = readdir(dp)) != NULL)
	{
		sprintf(path, "%s%s", dir, d->d_name);
		stat(path,&m);

		printf("%ld %o %d %d %s %s\n", m.st_ino, m.st_mode, m.st_uid, m.st_gid, ctime(&m.st_atime),d->d_name);
	}
	closedir(dp);
	return 0;
}`,
    },
    "p4a.c": {
        title: "p4a",
        code: String.raw`#include<stdio.h>
#include<stdlib.h>
#include<sys/stat.h>
#include<sys/types.h>
#include<fcntl.h>
#include<unistd.h>

int main(int argc, char *argv[])
{
	if(argc == 3)
	{
		if(link(argv[1],argv[2]) == 0)
			printf("Hard link created\n");
		else
			printf("Hard link error");
	}
	else if(argc == 4)
	{
		if(symlink(argv[2], argv[3]) == 0)
			printf("Soft link created");
		else 
			printf("soft link error");
	}
	else
	{
		printf("Invalid argument");
	}
	return 0;
}`,
    },

    "p4bechoall.c": {
        title: "p4bechoall",
        code: String.raw`#include<stdio.h>
#include<stdlib.h>

int main(int argc, char *argv[])
{
	int i;
	printf("Arguments received by echoall:\n");
	for(i = 0; i<argc;i++)
	{
		printf("argv[%d] = %s\n", i, argv[i]);
	}
	return 0;
}`,
    },
    "p4bmain.c": {
        title: "p4bmain",
        code: String.raw`#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<sys/wait.h>

int main()
{
	int pid; 
	pid = fork();

	if(pid == 0)
	{
		execl("./interp","interp","CHILD_ARG1","CHILD_ARG2",NULL);
	}
	else{
		wait(NULL);
		printf("Parent process complete");
	}
	return 0;
}`,
    },
    "p5a.c": {
        title: "p5a",
        code: String.raw`#include<stdio.h>
#include<sys/stat.h>
#include<utime.h>

int main()
{
    char file1[20], file2[20];
    struct stat s;
    struct utimbuf t;

    printf("Enter source file: ");
    scanf("%s", file1);

    printf("Enter destination file: ");
    scanf("%s", file2);

    stat(file1, &s);

    t.actime = s.st_atime;
    t.modtime = s.st_mtime;

    utime(file2, &t);

    printf("Time copied successfully\n");

    return 0;
}`,
    },
    "p5b.c": {
        title: "p5b",
        code: String.raw`#include<stdio.h>
#include<signal.h>

void handler(int n)
{
    printf("\nSIGINT caught\n");
    signal(SIGINT, SIG_DFL);
}

int main()
{
    struct sigaction sa;

    sa.sa_handler = handler;
    sa.sa_flags = 0;

    sigaction(SIGINT, &sa, NULL);

    while(1);
}`,
    },
    "p6a.c": {
        title: "p6a",
        code: String.raw`#include<stdio.h>
#include<unistd.h>
#include<fcntl.h>
#include<string.h>

int main()
{
	char file[20], buf[20];
	int fd,n;

	printf("Enter the filename:");
	scanf("%s", file);

	printf("Enter n:");
	scanf("%d",&n);

	fd = open(file, O_RDWR);
	read(fd,buf,n);
	buf[n] = '\0';

	lseek(fd,0,SEEK_END);
	dup2(fd,1);
	write(1,buf,strlen(buf));

	close(fd);
}`,
    },
};