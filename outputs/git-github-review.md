# Git · GitHub 학습 정리

## 1. Git / GitHub

### 1-1. Git과 GitHub를 사용해야 하는 이유

Git은 소스 코드와 파일의 변경 이력을 관리하는 분산 버전 관리 시스템이다. 파일이 언제, 어떻게 변경되었는지 기록하고 문제가 발생했을 때 이전 상태로 되돌릴 수 있다.

GitHub는 Git 저장소를 인터넷에서 저장하고 공유하는 원격 플랫폼이다. 여러 개발자가 같은 프로젝트에서 협업하고 코드 리뷰, 이슈 관리, Pull Request 등을 진행할 수 있다.

Git과 GitHub를 사용하면 다음과 같은 장점이 있다.

- 작업 내용을 버전별로 기록할 수 있다.
- 문제가 발생했을 때 이전 버전으로 되돌릴 수 있다.
- 여러 사람이 동시에 프로젝트를 작업할 수 있다.
- 기능별로 작업을 분리할 수 있다.
- 원격 저장소에 코드를 백업하고 공유할 수 있다.
- 변경 내용을 비교하고 코드 리뷰를 진행할 수 있다.

### 1-2. Git과 GitHub의 차이

| 구분 | Git | GitHub |
| --- | --- | --- |
| 종류 | 버전 관리 도구 | Git 저장소 호스팅 서비스 |
| 실행 위치 | 개발자의 컴퓨터 | 인터넷상의 원격 서버 |
| 주요 역할 | 변경 이력, 커밋, 브랜치 관리 | 저장소 공유, 협업, 코드 리뷰 |
| 인터넷 필요 여부 | 기본 작업은 없어도 가능 | 원격 저장소와 통신할 때 필요 |

Git은 로컬 컴퓨터에서 동작하고, GitHub는 Git 저장소를 원격으로 보관하고 협업 기능을 제공한다.

### 1-3. Repository

Repository(저장소)는 프로젝트의 파일과 변경 이력을 관리하는 공간이다.

- **Local Repository**: 내 컴퓨터에 있는 Git 저장소
- **Remote Repository**: GitHub와 같은 원격 서버에 있는 Git 저장소

저장소에는 프로젝트 파일뿐 아니라 커밋 기록, 브랜치 정보, 태그 등의 데이터도 저장된다.

### 1-4. Commit

Commit은 변경된 파일의 상태를 하나의 버전으로 저장하는 작업이다. 커밋에는 변경 내용과 커밋 메시지가 함께 기록된다.

```bash
git add README.md
git commit -m "README 파일 수정"
```

좋은 커밋은 하나의 목적을 가지고 있어야 한다.

```text
좋은 예시: 로그인 유효성 검사 추가
지양할 예시: 수정
```

### 1-5. Branch

Branch(브랜치)는 하나의 프로젝트에서 작업 흐름을 분리하는 기능이다. 기본 브랜치의 코드를 직접 수정하지 않고 새로운 브랜치에서 기능을 개발한 뒤, 작업이 완료되면 다시 병합할 수 있다.

```text
main
 ├── develop
 │    ├── feature/login
 │    └── feature/payment
 └── hotfix/login-error
```

## 2. Git 기본 명령어

### 2-1. git config

Git의 사용자 이름과 이메일 등의 설정을 관리한다.

```bash
git config --global user.name "홍길동"
git config --global user.email "hong@example.com"
git config --list
```

`--global`을 사용하면 컴퓨터의 모든 저장소에 설정이 적용된다. 특정 저장소에만 설정하려면 `--global`을 생략한다.

### 2-2. git init

현재 디렉터리를 Git 저장소로 초기화한다.

```bash
mkdir my-project
cd my-project
git init
```

실행하면 해당 디렉터리에 `.git` 폴더가 생성된다.

### 2-3. git status

현재 작업 디렉터리의 상태를 확인한다.

```bash
git status
```

현재 브랜치, 수정된 파일, Staging Area에 추가된 파일, 추적하지 않는 파일을 확인할 수 있다.

### 2-4. git add

변경된 파일을 Staging Area에 추가한다. Staging Area는 다음 커밋에 포함할 변경 내용을 임시로 모아두는 공간이다.

```bash
git add README.md
git add .
```

`git add`만으로 변경 이력이 저장되는 것은 아니다. 실제 버전으로 저장하려면 `git commit`을 실행해야 한다.

### 2-5. git commit

Staging Area의 변경 내용을 로컬 저장소에 버전으로 저장한다.

```bash
git commit -m "회원가입 기능 추가"
```

커밋은 로컬 저장소에 저장되므로 GitHub에 자동으로 올라가지 않는다. 원격 저장소에 올리려면 `git push`가 필요하다.

### 2-6. git push

로컬 저장소의 커밋을 원격 저장소에 업로드한다.

```bash
git push origin main
git push -u origin feature/login
```

`origin`은 원격 저장소의 기본 이름이고, 마지막 부분은 업로드할 브랜치 이름이다. `-u` 옵션은 로컬 브랜치와 원격 브랜치의 추적 관계를 설정한다.

### 2-7. git pull

원격 저장소의 변경 내용을 가져와 현재 로컬 브랜치에 반영한다.

```bash
git pull origin main
```

일반적으로 `git pull`은 `git fetch`와 `git merge`를 순서대로 실행하는 것과 비슷하게 동작한다.

### 2-8. 기본 작업 흐름

```bash
git init
git status
git add .
git commit -m "첫 번째 커밋"
git remote add origin https://github.com/example/my-project.git
git push -u origin main
```

기존 프로젝트에서 작업할 때는 보통 최신 내용 가져오기, 파일 수정, `git status`, `git add`, `git commit`, `git push` 순서로 진행한다.

## 3. Branch

### 3-1. git branch 명령어

```bash
git branch                         # 브랜치 목록 확인
git branch feature/login           # 브랜치 생성
git switch -c feature/login       # 생성 후 바로 이동
git switch main                   # 기존 브랜치로 이동
git branch -d feature/login       # 브랜치 삭제
git branch -a                     # 원격 브랜치까지 확인
```

### 3-2. 브랜치 관리

| 브랜치 | 역할 |
| --- | --- |
| `main` | 실제 배포 가능한 안정적인 코드 |
| `develop` | 다음 버전 개발 내용을 통합하는 브랜치 |
| `feature` | 새로운 기능을 개발하는 브랜치 |
| `hotfix` | 운영 중인 서비스의 긴급한 버그를 수정하는 브랜치 |
| `release` | 배포 전 테스트와 마무리를 진행하는 브랜치 |

일반적인 작업 흐름은 `develop`에서 `feature/login`을 생성하고, 기능 개발이 끝나면 `develop`에 병합하는 방식이다. 배포 준비가 끝나면 `release`에서 테스트한 뒤 `main`에 병합한다. 운영 중 긴급한 문제가 발생하면 `hotfix` 브랜치에서 수정한다.

```text
feature/login
feature/payment
hotfix/auth-error
release/1.0.0
```

### 3-3. Fast-forward

Fast-forward는 병합 대상 브랜치에 별도의 새로운 커밋이 없을 때, 브랜치 포인터만 앞으로 이동하는 병합 방식이다.

```text
병합 전
main:    A
feature: A - B - C

병합 후
main:    A - B - C
feature: A - B - C
```

`main`에서 작업한 내용이 없고 `feature` 브랜치만 앞으로 진행된 경우에 발생한다. 별도의 Merge Commit이 생성되지 않는다.

### 3-4. 3-way merge

3-way merge는 두 브랜치가 공통 조상 커밋 이후 각각 변경되었을 때 사용하는 병합 방식이다. Git은 공통 조상, 현재 브랜치의 최신 커밋, 병합할 브랜치의 최신 커밋을 비교한다.

```text
          B (main)
         / \
A ------   M (Merge Commit)
         \
          C (feature)
```

두 브랜치의 변경 내용을 합치기 위해 새로운 Merge Commit이 생성된다.

```bash
git switch main
git merge feature/login
```

### 3-5. Merge conflict

Merge Conflict는 Git이 두 브랜치의 변경 내용을 자동으로 합칠 수 없을 때 발생하는 충돌이다. 같은 파일의 같은 부분을 서로 다르게 수정했을 때 주로 발생한다.

```text
<<<<<<< HEAD
현재 브랜치의 내용
=======
병합하려는 브랜치의 내용
>>>>>>> feature/login
```

충돌을 해결하는 과정은 다음과 같다.

1. `git status`로 충돌이 발생한 파일을 확인한다.
2. 충돌 표시를 확인하고 최종적으로 남길 내용을 직접 수정한다.
3. `<<<<<<<`, `=======`, `>>>>>>>` 표시를 삭제한다.
4. 해결한 파일을 Staging Area에 추가한다.

```bash
git status
git add 충돌이_해결된_파일
git commit -m "feature/login 병합 충돌 해결"
```

병합을 취소하고 충돌이 발생하기 전 상태로 돌아가려면 다음 명령어를 사용한다.

```bash
git merge --abort
```

충돌을 줄이려면 작업 전에 최신 변경 내용을 `pull`하고, 하나의 커밋에 너무 많은 작업을 담지 않는 것이 좋다.

## 핵심 요약

- Git은 변경 이력을 관리하는 버전 관리 도구이고, GitHub는 Git 저장소를 공유하는 원격 플랫폼이다.
- Repository는 프로젝트 파일과 변경 이력을 저장하는 공간이다.
- Commit은 변경 내용을 하나의 버전으로 저장하는 작업이다.
- `git add`는 커밋할 변경 내용을 Staging Area에 추가하고, `git commit`은 로컬 저장소에 저장한다.
- `git push`는 로컬 커밋을 원격 저장소에 업로드하고, `git pull`은 원격 변경 내용을 로컬에 반영한다.
- Branch는 작업 흐름을 분리하는 기능이며, `main`, `develop`, `feature`, `hotfix`, `release` 등의 역할로 관리할 수 있다.
- Fast-forward는 브랜치 포인터만 이동하는 병합이고, 3-way merge는 새로운 Merge Commit을 생성하는 병합이다.
- Merge Conflict는 Git이 변경 내용을 자동으로 합칠 수 없을 때 발생하며, 충돌 내용을 직접 수정한 뒤 다시 커밋해야 한다.
