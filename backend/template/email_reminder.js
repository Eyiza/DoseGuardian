const reminderEmailTemplate = function (medications) {

    const medicationList = medications.map(medication => `
    <li>
      <strong>Name:</strong> ${medication.name}<br>
      <strong>Dosage:</strong> ${medication.dosage}<br>
      <strong>Interval:</strong> Every ${medication.interval} hours
    </li>`).join('');

    const html = `
      <html>
      <head>
          <style>
              body {
                  font-family: 'Arial', sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border: 1px solid #ddd;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                  background-color: #4CAF50;
                  color: #fff;
                  padding: 20px;
                  text-align: center;
                  border-top-left-radius: 8px;
                  border-top-right-radius: 8px;
              }
              .content {
                  padding: 20px;
              }
              .footer {
                  background-color: #f2f2f2;
                  padding: 10px;
                  text-align: center;
                  border-bottom-left-radius: 8px;
                  border-bottom-right-radius: 8px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Medication Reminder</h1>
              </div>
              <div class="content">
                  <p>Dear Patient,</p>
                  <p>This is a reminder to take your medication. Here is your medication schedule:</p>
                  <ul>${medicationList}</ul>
                  <p>Please ensure you follow the prescribed dosage and schedule. If you have any questions, feel free to contact your healthcare provider.</p>
                  <p>Stay healthy!</p>
              </div>
              <div class="footer">
                  <p>Thank you for using DoseGuardian!</p>
              </div>
          </div>
      </body>
      </html>
    `;
  
    const text = `
      Dear Patient,
  
      This is a reminder to take your medication.  Here is your medication schedule:
      ${medications.map(medication => `
        - Medication Name: ${medication.name}, Dosage: ${medication.dosage}, Interval: Every ${medication.interval} hours
      `).join('\n')}
  
      Please ensure you follow the prescribed dosage and schedule. If you have any questions, feel free to contact your healthcare provider.
  
      Stay healthy!
  
      Thank you for using DoseGuardian!
    `;
  
    const subject = "Medication Reminder";
  
    return {
      html: html,
      text: text,
      subject: subject,
    };
  };
  
  module.exports = reminderEmailTemplate;