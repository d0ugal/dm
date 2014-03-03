$(function(){

  "use strict";

  var Repo = (function(){

    function Repo(repo_json){

      var that = this;

      $.each(repo_json, function(key, value){
        that[key] = value;
      });

    }

    return Repo;

  })();

  var repo_manager = (function(){

    function RepoManager() {

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

    };

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

    };

    RepoManager.prototype.languages_by_popularity = function(){

      var language_list = [];

      $.each(this.language_repos, function(name, repos){
        language_list.push({'name': name, 'count': repos.length});
      });

      language_list.sort(function(a, b){
        if (a.count < b.count) {
          return 1;
        }
        if (b.count < a.count) {
          return -1;
        }
        return 0;
      });

      language_list = language_list.slice(0, 3);

      var parts = [];

      $.each(language_list, function(i, obj){
        parts.push(obj.count + " in " + obj.name);
      });

      var str = parts.join(", ");
      var pos = str.lastIndexOf(',');
      str = str.substring(0, pos) + " and" + str.substring(pos + 1);
      return str;

    };

    return new RepoManager();

  })();

  var page_updater = function(mapping){

    $.each(mapping, function(path, value){

      $(path).html(value);

    });

  };

  var rate_limit_check = function(meta){

    if (meta['X-RateLimit-Remaining'] <= 0){

      $('.stats-list').hide();
      $('.rate-limit').show();
      return true;

    }

    return false;

  }

  $('.stats-list').show();

  $.getJSON("https://api.github.com/users/d0ugal/repos?per_page=100&callback=?", function (result) {

    if (rate_limit_check(result.meta)){
      return;
    }

    var repos = result.data;

    $.each(repos, function (i, repo) {
      repo_manager.add(repo);
    });

    page_updater({
      '.forked-count': repo_manager.forked_repos.length,
      '.source-count': repo_manager.source_repos.length,
      '.watchers-count': repo_manager.total_watchers,
      '.languages-by-popularity': repo_manager.languages_by_popularity()
    });

  });

  $.getJSON("https://api.github.com/users/d0ugal?callback=?", function (result) {

    if (rate_limit_check(result.meta)){
      return;
    }

    var user = result.data;

    page_updater({
      '.repo-count': user.public_repos
    });

  });

  $.getJSON("https://api.github.com/users/d0ugal/orgs?callback=?", function(result){

    if (rate_limit_check(result.meta)){
      return;
    }

    var orgs = result.data;

    page_updater({
      '.org-count': orgs.length
    });

  });

  // $.getJSON("https://api.github.com/users/d0ugal/events?callback=?", function(result){
  //   var events = result.data;
  // });

  $.getJSON("http://stackalytics.com/api/1.0/contribution?user_id=dougal&callback=?", function(result){

    var commits = result.contribution.commit_count;
    var rs = result.contribution.marks
    var reviews = rs['-2'] + rs['-1'] + rs['0'] + rs['1'] + rs['2'];
    var loc_count = result.contribution.loc;

    page_updater({
      '.openstack-loc': loc_count,
      '.openstack-commits': commits,
      '.openstack-reviews': reviews
    });

  });

});
