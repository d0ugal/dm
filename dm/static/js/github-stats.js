$(function(){

  var Repo = (function(){

    function Repo(repo_json){

      var that = this;

      $.each(repo_json, function(key, value){
        that[key] = value;
      });

    }

    return Repo;

  })()

  repo_manager = (function(){

    function RepoManager(options) {

        this.repos = [];
        this.language_repos = {};
        this.total_watchers = 0;
        this.forked_repos = [];
        this.source_repos = [];

    }

    RepoManager.prototype.add = function (repo) {

      var r = new Repo(repo);
      this.repos.push(r);
      this.update_stats_with(r);

    }

    RepoManager.prototype.update_stats_with = function(repo){

      if(!this.language_repos[repo.language]){
          this.language_repos[repo.language] = [];
      }

      this.language_repos[repo.language].push(repo);

      if(repo.fork){
        this.forked_repos.push(repo);
      } else {
        this.source_repos.push(repo);
      }

      this.total_watchers += repo.watchers_count;

    }

    return new RepoManager();

  })()

  page_updater = function(mapping){

    $.each(mapping, function(path, value){

      $(path).html(value);

    });

  };


  $.getJSON("https://api.github.com/users/d0ugal/repos?per_page=100&callback=?", function (result) {

      var repos = result.data;

      $.each(repos, function (i, repo) {
        repo_manager.add(repo);
      });

      page_updater({
        '.repo-count': repo_manager.repos.length,
        '.forked-count': repo_manager.forked_repos.length,
        '.source-count': repo_manager.source_repos.length,
        '.watchers-count': repo_manager.total_watchers
      })

  });

});