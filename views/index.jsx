var React = require('react');
var Layout = require('./layout');
var Calendar = require('./reactcalendar/calendar');
var Month = require('./reactcalendar/month');
var Day = require('./reactcalendar/day');
var dateUtils = require('./reactcalendar/dateUtils');

var moment = require('moment');


var Index = React.createClass({
  
  render: function() {
    return (
      <Layout>

        <div className="calendar-container">
          
          <Calendar firstMonth={1}
            date={moment("2014-01-01")}
            weekNumbers={true}
            size={12}
            monthNameFormat='MMMM'
            weekdayFormat='dddd'>
          
              <Month date={moment()} modifiers={{current: true }}/>
              <Day date={moment()} modifiers={{current: true}} />
        
          </Calendar>
        
        </div>  

      </Layout>
    );
  }
});

module.exports = Index;
