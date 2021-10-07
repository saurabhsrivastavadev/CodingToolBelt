<template>
  <div class="flex flex-col items-center font-ubuntu">
    <section id="title">
      <h1 class="text-4xl">Github Profile Badge</h1>
    </section>
    <section id="description" class="mb-8">
      <p class="text-red-800">
        Build a Github Profile Badge to showcase your work
      </p>
    </section>
    <section id="userInput" class="flex flex-wrap w-screen px-8 space-x-2 justify-center">
      <div class="flex flex-col mr-2">
        <label class="font-bold ml-2 mb-1">Github User Id</label>
        <input
          v-model="userId"
          placeholder="Github User ID"
          class="p-2 border-2 border-red-400 rounded-lg"
        />
      </div>
      <button class="bg-red-800 text-white rounded-lg px-8 w-80" @click="loadUserProfile">
        {{loadButtonText}}
        <br/>
        Github Request Quota: {{rateLimitRemaining}}/{{rateLimit}}
      </button>
    </section>
    <section v-if="fetchCompleted" id="badgeArea" class="m-4 mt-10 p-4 border-red-200 border-2 text-center">
      <div class="flex space-x-4 divide-x-2 divide-red-200">
        <div id="leftCol">
          <img :src="userProfile.avatarUrl" alt="ProfilePic" class="rounded-3xl w-40">
          <div class="font-bold mt-2">{{userProfile.name}}</div>
          <a class="underline" :href="`https://github.com/${userProfile.login}`" target="blank">{{userProfile.login}}</a>
          <div>{{userProfile.publicRepoCount}} Public Github Repos</div>
          <div>{{totalCommits}} Total Commits</div>
        </div>
        <div id="middleCol" class="flex flex-col justify-center pl-4">
          <div v-for="(languageBytes, languageName) in totalLanguages" :key="languageName" class="font-sm">
            {{languageName}} = {{languageBytes}} Bytes of code
          </div>
        </div>
        <div id="rightCol" class="flex flex-col justify-center pl-4">
          <div v-for="userRepo in userReposArray.slice(0, 9)" :key="userRepo.name" class="font-sm">
            {{userRepo.name}} = {{userRepo.commitsArray.length}} Commits
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
<script>
class UserProfile {

  login = '';
  name = '';
  avatarUrl = '';
  publicRepoCount = 0;

  constructor(userProfileJsonStr) {
    const userProfileJson = JSON.parse(userProfileJsonStr);
    this.login = userProfileJson.login;
    this.name = userProfileJson.name;
    this.avatarUrl = userProfileJson.avatar_url;
    this.publicRepoCount = userProfileJson.public_repos;
  }
}
class UserRepo {

  name = '';
  isPrivate = false;
  htmlUrl = '';
  description = '';
  languages = {};
  commitsArray = [];

  constructor(userRepoJson) {
    this.name = userRepoJson.name;
    this.isPrivate = userRepoJson.private;
    this.htmlUrl = userRepoJson.html_url;
    this.description = userRepoJson.description;
  }

  static parseUserRepoArrayJsonStr(repoArrJsonStr) {
    const repoArrJson = JSON.parse(repoArrJsonStr);
    const repoArray = [];
    for (const repoJson of repoArrJson) {
      repoArray.push(new UserRepo(repoJson));
    }
    return repoArray;
  }
}
class GitCommit {

  sha = '';
  authorName = '';
  authorEmail = '';
  date = '';
  message = '';

  constructor(gitCommitJson) {
    this.sha = gitCommitJson.sha;
    this.authorName = gitCommitJson.commit.author.name;
    this.authorEmail = gitCommitJson.commit.author.email;
    this.date = gitCommitJson.commit.author.date;
    this.message = gitCommitJson.commit.message;
  }

  static parseGitCommitArrayJsonStr(gitCommitArrayJsonStr) {
    const gitCommitArrayJson = JSON.parse(gitCommitArrayJsonStr);
    const gitCommitArray = [];
    for (const gitCommitJson of gitCommitArrayJson) {
      gitCommitArray.push(new GitCommit(gitCommitJson));
    }
    return gitCommitArray;
  }
}

export default {
  data() {
    return {
      loadButtonText: 'Load User Profile',
      userId: 'saurabhsrivastavadev',
      userProfile: null,
      userReposArray: [],
      rateLimit: 0,
      rateLimitRemaining: 0,
      fetchCompleted: false,
      totalCommits: 0,
      totalLanguages: {},
    }
  },
  async created() {
    const response = await fetch(`https://api.github.com/rate_limit`);
    const rateLimitJsonStr = await response.text();
    const rateLimitJson = JSON.parse(rateLimitJsonStr);
    this.rateLimit = rateLimitJson.resources.core.limit;
    this.rateLimitRemaining = rateLimitJson.resources.core.remaining;
  },
  methods: {
    async loadUserProfile() {
      if (this.userId === null || this.userId.trim() === '') {
        alert('Please specify a valid Github User ID');
        return;
      }

      try {

        this.fetchCompleted = false;
        this.totalCommits = 0;
        this.totalLanguages = {};

        this.loadButtonText = 'Fetching User Profile..';
        let response = await fetch(`https://api.github.com/users/${this.userId}`);
        const userProfileJsonStr = await response.text();
        this.userProfile = new UserProfile(userProfileJsonStr);

        this.loadButtonText = 'Fetching User Repositories..';
        response = await fetch(`https://api.github.com/users/${this.userId}/repos?per_page=100`);
        const userReposJsonStr = await response.text();
        this.userReposArray = UserRepo.parseUserRepoArrayJsonStr(userReposJsonStr);

        this.loadButtonText = 'Fetching Commits..';
        for (const repo of this.userReposArray) {
          response = await fetch(`https://api.github.com/repos/${this.userId}/${repo.name}/commits?per_page=100`);
          const commitArrayJsonStr = await response.text();
          repo.commitsArray = GitCommit.parseGitCommitArrayJsonStr(commitArrayJsonStr);
          this.totalCommits += repo.commitsArray.length;
        }

        // Sort the repo array in place
        this.userReposArray.sort((repo1, repo2) => {
          return (repo2.commitsArray.length - repo1.commitsArray.length);
        });

        this.loadButtonText = 'Fetching Language Info..';
        for (const repo of this.userReposArray) {
          response = await fetch(`https://api.github.com/repos/${this.userId}/${repo.name}/languages?per_page=100`);
          const languagesJsonStr = await response.text();
          repo.languages = JSON.parse(languagesJsonStr);
          for (const [key, value] of Object.entries(repo.languages)) {
            if (this.totalLanguages[key]) {
              this.totalLanguages[key] += value;
            } else {
              this.totalLanguages[key] = value;
            }
          }
        }

        this.loadButtonText = 'Done. Click to fetch again.';
        this.fetchCompleted = true;

      } catch (error) {
        this.loadButtonText = 'Failed, try again.';
      }
    }
  }
}
</script>