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
    <section v-if="userProfile" id="badgeArea" class="m-4 mt-10 p-4 border-red-200 border-2">
      {{userProfile}}
      <br/><br/>
      <div v-if="fetchCompleted">
        <div v-for="userRepo in userReposArray" :key="userRepo.name" class="text-center">
          <b>{{userRepo.name}}</b>
          <br/>
          {{userRepo.commitsArray.length}} Commits.
          <br/>
          {{userRepo.languages}}
          <br/><br/>
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
      userReposArray: null,
      rateLimit: 0,
      rateLimitRemaining: 0,
      fetchCompleted: false,
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

        this.loadButtonText = 'Fetching User Profile..';
        let response = await fetch(`https://api.github.com/users/${this.userId}`);
        const userProfileJsonStr = await response.text();
        this.userProfile = new UserProfile(userProfileJsonStr);

        this.loadButtonText = 'Fetching User Repositories..';
        response = await fetch(`https://api.github.com/users/${this.userId}/repos`);
        const userReposJsonStr = await response.text();
        this.userReposArray = UserRepo.parseUserRepoArrayJsonStr(userReposJsonStr);

        this.loadButtonText = 'Fetching Commits..';
        for (const repo of this.userReposArray) {
          response = await fetch(`https://api.github.com/repos/${this.userId}/${repo.name}/commits`);
          const commitArrayJsonStr = await response.text();
          repo.commitsArray = GitCommit.parseGitCommitArrayJsonStr(commitArrayJsonStr);
        }

        this.loadButtonText = 'Fetching Language Info..';
        for (const repo of this.userReposArray) {
          response = await fetch(`https://api.github.com/repos/${this.userId}/${repo.name}/languages`);
          const languagesJsonStr = await response.text();
          repo.languages = JSON.parse(languagesJsonStr);
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