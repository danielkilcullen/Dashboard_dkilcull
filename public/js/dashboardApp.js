var dashboardApp = new Vue({
  el: '#dashboard',
  data: {
    project: {
      name : 'pop',
      short_description: '',
      start_date : '',
      target_date : '',
      budget : '',
      spent : '',
      projected_spend: '',
      weekly_effort_target: ''
    },
    tasks: [
      {
        id: 0,
        title: '',
        type : '',
        size : '',
        team : '',
        status: '',
        start_date: '',
        close_date: null,
        hours_worked: '',
        perc_complete: '',
        current_sprint : ''
      }
    ]
  },
  computed: {
    days_left() {
      return moment(this.project.target_date).diff(moment(),'days');
    }
    // workForm {
    //
    // }
  },
  methods: {
    pretty_Date(d) {
      //do_magic
      return moment(d).format('1');
    },
    pretty_Currency(val) {
      if(val < 1e3) {
        return '$' + val;
      }
      if(val < 1e6) {
        return '$' + (val/1e3).toFixed(1) + 'k';
      }
      return '$' + (val/1e6).toFixed(1) + 'M';
    },
    completeClass: function(task) {
      if(task.perc_complete == 100) {
        return 'alert-success';
      }
      if(task.current_sprint && task.hours_worked == 0) {
        return 'alert-warning';
      }
    },
    fetchProject() {
      fetch('https://raw.githubusercontent.com/tag/iu-msis/dev/public/project1.json')
      .then( response => response.json() )
      .then( json => {
        dashboardApp.project = json;
        console.log('FETCH returned: ');
        console.log(json);
      })
      .catch( err => {
        console.log('PROJECT FETCH error: ');
        console.log(err);
      });
      return json;
    },
    fetchTasks() {
      fetch('https://raw.githubusercontent.com/tag/iu-msis/dev/public/p1-tasks.json')
      .then( response => response.json())
      .then( json => {
        dashboardApp.tasks = json;
        console.log('FETCH returned: ');
        console.log(json);
      })
      .catch( err => {
        console.log('TASK FETCH error: ');
        console.log(err);
      });
    }
  },
  created() {
    this.fetchTasks();
    this.fetchProject();
    //
    // console.log(window.location.href);
    //
    // const url = new URL(window.location.href);
    // const taskId = url.searchParams.get("taskId");
    //
    // this.task.id = taskId;
    //
    // console.log('Task: ' + taskId);
    // if(!taskId) {
      //TODO: error? 404?
      //e.g., window.location = '404.html'
    }
    //TODO: fetch task-specific data
  },
  handleWorkForm(e) {
    //TODO: check validity
    e.preventDefault();
    console.log(E);
    alert(JSON.stringify(this.workForm));

    //TODO: calculate horus
    //something like moment.duration(end.diff(startTime))...

    //TODO: clone handleWorkForm
    const s = JSON.stringify(this.workForm);
    //TODO: post to remote server
    //TODO: append result
    this.work.push(JSON.parse(s));
    //reset WorkForm
    this.workForm = {
      start: '',
      stop: '',
      completion_estimate: ''
    }
  },
  gotoTask(tid) {
    window.location = 'task.html?taskId=' + tid;
  },
  sumHours() {
    return this.work.reduce((sum, current) => sum + current.hours_worked);
  },
  diffAsHours() {
    return 0;
  }
});
