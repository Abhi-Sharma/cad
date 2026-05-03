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
	"p6b.c": {
		title: "p6b",
		code: String.raw`#include<stdio.h>
#include<fcntl.h>
#include<unistd.h>

int main() {
	int fd,n;
	char f1[100],buf[51];
	struct flock f;
	off_t s;
	printf("Enter file name: ");
	scanf("%s",f1);
	fd=open(f1,O_RDWR);

	s=lseek(fd,0,SEEK_END);

	f.l_type=F_WRLCK;
	f.l_whence=SEEK_SET;
	f.l_start=s-100;
	f.l_len=100;

	fcntl(fd,F_GETLK,&f);
	if(f.l_type!=F_UNLCK) {
		printf("Locked by PID: %d\n",f.l_pid);
		return 0;
	}

	f.l_type=F_WRLCK;
	fcntl(fd,F_SETLK,&f);

	printf("Region locked. Press Enter to continue...\n");
	getchar();
	getchar();

	lseek(fd,s-50,SEEK_SET);
	n=read(fd,buf,50);
	buf[n]='\0';
	printf("%s\n",buf);

	f.l_type=F_UNLCK;
	fcntl(fd,F_SETLK,&f);

	printf("Region unlocked\n");
}`,
	},
	"p7a.c": {
		title: "p7a",
		code: String.raw`#include<stdio.h>
#include<setjmp.h>

jmp_buf buf;
int gv = 95;
static int sv = 99;

void f1()
{
	int av = 96;
	register int rv = 97;
	volatile int vv = 98;


	printf("in f1()\n");
	printf("gv=%d, av=%d, rv=%d, vv=%d, sv=%d\n", gv, av, rv, vv, sv);
	if(setjmp(buf) == 0)
	{
		gv = 100;
		av = 200;
		rv = 300;
		vv = 400;
		sv = 500;
		
		longjmp(buf, 1);
	}
	else{
		printf("After long jump\n");
		printf("gv=%d, av=%d, rv=%d, vv=%d, sv=%d\n", gv, av, rv, vv, sv);
	}
}
int main()
{
	f1();
	return 0;
}`,
	},
	"p7b.c": {
		title: "p7b",
		code: String.raw`#include<stdio.h>

int main(int argc, char *argv[])
{
	FILE *fp1,*fp2;
	char ch;

	if(argc != 3)
	{
		printf("Usage %s source destination:",argv[0]);
		return 1;
	}

	fp1 = fopen(argv[1],"r");

	if(fp1 == NULL)
	{
		printf("Error opening source file:");
		return 1;
	}

	fp2 = fopen(argv[2],"w");

	if(fp2 == NULL)
	{
		printf("Error creating destination file");
		return 1;
	}

	while((ch = fgetc(fp1))!=EOF)
		fputc(ch,fp2);
	printf("Copied successfully");

	fclose(fp1);
	fclose(fp2);

	return 0;
}`,
	},
	"p9a.c": {
		title: "p9a",
		code: String.raw`#include<stdio.h>
#include<unistd.h>
#include<sys/stat.h>
#include<fcntl.h>

int main()
{
	mode_t oldmask;

	oldmask = umask(002);
	printf("Oldmask:%03o, New mask : 022\n", oldmask);

	int fd = creat("t1.txt", 0777);

	if(fd < 0)
	{
		printf("Error creating file\n");
	       	return 1;
	}
	chmod("t1.txt", 0644);
	printf("Changing permission of t1.txt to 0644\n");
	 return 0;
}`,
	},
	"p9b.c": {
		title: "p9b",
		code: String.raw`#include<stdio.h>
#include<unistd.h>
#include<fcntl.h>
#include<sys/wait.h>
#include<sys/types.h>
#include<sys/stat.h>

int main(int argc, char *argv[])
{
	int fd;
	char buf[21];
	int n;

	if(argc != 2)
	{
		printf("Usage: %s <filename>\n", argv[0]);
		return 1;
	}

	fd = open(argv[1], O_RDONLY);
	if(fd < 0)
	{
		printf("Error opening file");
		return 1;
	}

	n = read(fd, buf, 20);
	buf[n] = '\0';
	printf("first 20: %s\n", buf);

	lseek(fd, 10, SEEK_SET);
	n = read(fd, buf, 20);
	buf[n] = '\0';
	printf("Next 20 from 10: %s\n", buf);
	
	lseek(fd, 10, SEEK_CUR);
	n = read(fd, buf, 20);
	buf[n] = '\0'; 
	printf("next 20, from current: %s\n", buf);
	
	int size = lseek(fd, 0, SEEK_END);
	printf("File size: %d\n", size);

    close(fd);
    return 0;
}`,
	},
	"p8a.c": {
		title: "p8a",
		code: String.raw`#include<stdio.h>
#include<sys/stat.h>

int main(int argc, char *argv[])
{
    struct stat s;
    int i;

    if(argc < 2)
    {
        printf("Usage: %s file1 file2 ...\n", argv[0]);
        return 1;
    }

    for(i = 1; i < argc; i++)
    {
        if(lstat(argv[i], &s) == -1)
        {
            printf("%s: Error\n", argv[i]);
            continue;
        }

        if(S_ISREG(s.st_mode))
            printf("%s: regular\n", argv[i]);
        else if(S_ISDIR(s.st_mode))
            printf("%s: directory\n", argv[i]);
        else if(S_ISLNK(s.st_mode))
            printf("%s: symbolic link\n", argv[i]);
        else
            printf("%s: other\n", argv[i]);
    }

    return 0;
}`,
	},
	"p8bchild.c": {
		title: "p8bchild",
		code: String.raw`#include<stdio.h>
#include<unistd.h>

int main(int argc, char *argv[])
{
	if(argc < 2)
	{
		printf("Usage: %s <filename>\n", argv[0]);
		return 1;
	}

	if(access(argv[1], F_OK) == 0)
		printf("File '%s' exists and can be accessed.\n", argv[1]);
	else
		printf("File '%s' does not exist and cannot be accessed.\n", argv[1]);

	return 0;
}`,
	},
	"p8bparent.c": {
		title: "p8bparent",
		code: String.raw`#include<stdio.h>
#include<unistd.h>
#include<sys/wait.h>

int main()
{
    int pid = fork();

    if(pid == 0)
    {
        // Child
        printf("Child process (PID: %d) executing...\n", getpid());

        execl("./a.out", "a.out", "example.txt", NULL);

        printf("Exec failed\n");
    }
    else
    {
        // Parent
        printf("Parent process (PID: %d) executing...\n", getpid());

        wait(NULL);

        printf("Parent process: Child process (PID: %d) has exited.\n", pid);
    }

    return 0;
}`,
	},
	"p10a.c": {
		title: "p10a",
		code: String.raw`#include<stdio.h>
#include<unistd.h>
#include<sys/types.h>
#include<fcntl.h>
#include<stdlib.h>

int main()
{
	pid_t pid;
	pid = fork();

	if(pid < 0)
	{
		printf("Fork failed");
		exit(1);
	}
	if(pid > 0)
	{
		exit(0);
	}

	setsid();
	printf("Daemon process started with pid : %d\n", getpid());

	while(1)
	{
		sleep(5);
	}
	return 0;
}`,
	},
	"p10b.c": {
		title: "p10b",
		code: String.raw`#include<stdio.h>
#include<unistd.h>
#include<fcntl.h>
#include<stdlib.h>
#include<sys/wait.h>


int main()
{
	int pd1,pd2;

	pd1 = fork();
	if(pd1 == 0)
	{
		printf("First pid :%d\n",getpid());
		sleep(1);
		printf("First wait\n");
		return 0;
	}
	else{
		pd2 = fork();
		if(pd2 == 0)
		{
			printf("Second pid :%d\n", getpid());
			sleep(2);
			printf("Second wait\n");
			return 0;
		}
		else{
			printf("first pid :%d\n", getpid());

			wait(NULL);
			waitpid(pd2, NULL, 0);
		}
	}
	 return 0;
}`,
	},
	"p11adup.c": {
		title: "p11adup",
		code: String.raw`#include<stdio.h>
#include<unistd.h>
#include<fcntl.h>

int main()
{
	int fd1 , fd2;

	fd1 = open("test.txt",O_CREAT | O_RDWR, 0644);

	if(fd1 < 0)
	{
		printf("Error file opeining");
		return 1;
	}

	fd2 = dup(fd1);
	printf("%d %d\n",fd1,fd2);

	return 0;
}`,
	},
	"p11adup2.c": {
		title: "p11adup2",
		code: String.raw`#include<stdio.h>
#include<unistd.h>
#include<fcntl.h>

int main()
{
	int fd1,fd2;

	fd1 = open("test.txt",O_CREAT | O_WRONLY, 0644);

	fd2 = dup2(fd1,0);
	printf("%d %d\n",fd1,fd2);

	write(fd1,"abcdef\n",7);
	printf("abcdef\n");
	 return 0;
}`,
	},
	"p11bchild.c": {
		title: "p11bchild",
		code: String.raw`#include<stdio.h>
#include<unistd.h>
#include<stdlib.h>

int main(int argc, char *argv[])
{
	int a,b,sum;

	if(argc != 3)
	{
		printf("Usage %s num1 num2\n",argv[0]);
		return 1;
	}

	a = atoi(argv[1]);
	b = atoi(argv[2]);

	sum  = a + b;
	printf("Sum is :%d\n", sum);
	return 0;
}`,
	},
	"p11bparent.c": {
		title: "p11bparent",
		code: String.raw`#include<stdio.h>
#include<unistd.h>
#include<sys/wait.h>
#include<fcntl.h>

int main(int argc, char *argv[])
{
	int pid, status;

	if(argc != 3)
	{
		printf("usage :%s num1 num2\n",argv[0]);
		return 1;
	}
	pid = fork();
	if(pid == 0)
	{
		execl("./child","child",argv[1],argv[2],NULL);
		printf("Exel failed");
	}
	else{
		wait(&status);
		printf("Child exited with status: %d\n", status);
	}
	return 0;
}`,
	},
	"p12a.c": {
		title: "p12a",
		code: String.raw`#include<stdio.h>
#include<unistd.h>
#include<stdlib.h>
#include<sys/wait.h>

int main()
{
    int pid1, pid2;

    
    pid1 = fork();

    if(pid1 == 0)
    {
        printf("Child 1 pid: %d\n", getpid());
        exit(0);   
    }
    else
    {
        sleep(2);  

        printf("terminated child's pid: %d\n", pid1);

        
        pid2 = fork();

        if(pid2 == 0)
        {
            printf("Child 2 pid is: %d\n", getpid());
            printf("second child, parent pid = %d\n", getppid());
            exit(0);
        }
        else
        {
            wait(NULL);   
            wait(NULL);   
        }
    }

    return 0;
}`,
	},
	"p12bechoall.c": {
		title: "p12bechoall",
		code: String.raw`#include<stdio.h>

extern char **environ;

int main()
{
    int i = 0;

    while(environ[i] != NULL)
    {
        printf("%s\n", environ[i]);
        i++;
    }

    return 0;
}`,
	},
	"p12bmain.c": {
		title: "p12bmain",
		code: String.raw`#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<sys/wait.h>

extern char **environ;

int main()
{
    int pid = fork();

    if(pid == 0)
    {
        printf("Child process executing...\n");

        char *env[] = {
            "USER=ANMOL",
            "PATH=/custom/bin",
            "HOME=/home/custom",
            NULL
        };

        execle("./echoall", "echoall", NULL, env);
    }
    else
    {
        printf("Parent process executing...\n");

        wait(NULL);

        execle("./echoall", "echoall", NULL, environ);
    }

    return 0;
}`,
	},
};