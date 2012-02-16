$(function(){

  var Repo = (function(){

    function Repo(repo_json){
      $.each(repo_json, function(key, value){
        this[key] = value;
      });
    }

    return Repo;

  })()

  repo_manager = (function(){

    function RepoManager(options) {

        this.repos = [];
        this.language_repos = [];
        this.watchers_count = [];
        this.forked_repos = [];
        this.source_repos = [];

    }

    RepoManager.prototype.add = function (repo) {
      var r = new Repo(repo);
      this.repos.push(r);


    }

    RepoManager.prototype.update_stats_with = function(repo){

      if(!this.language_repos[repo.language]){
          this.language_repos[repo.language] = [];
      }

      language_counts[repo.language].push(repo);

      if(repo.fork){
        this.forked_repos.push(repo);
      } else {
        this.source_repos.push(repo);
      }

      this.watchers_count += repo.watchers_count;

    }

    RepoManager.prototype.stats = function(repo){
      console.log(this.repos.length);
      console.log(this.language_repos);
      console.log(this.watchers_count);
      console.log(this.forked_repos.length);
      console.log(this.source_repos.length);
    }

    return new RepoManager();

  })()

  $.getJSON("https://api.github.com/users/d0ugal/repos?per_page=100&callback=?", function (result) {

      var repos = result.data;

      $.each(repos, function (i, repo) {
        repo_manager.add(repo);
      });

      console.log(repo_manager.stats())

  });

});