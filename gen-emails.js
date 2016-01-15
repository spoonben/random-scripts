  var prompt = require('prompt'),
      crypto = require('crypto')
      fs = require('fs');

  prompt.start();

  prompt.get(
    ['original email', 'number to generate', 'file'], function (err, result) {
    var emails = genEmails(result['original email'], result['number to generate']);
    writeEmailsToFile(result['file'], emails);
  });

  function genEmails(email, number) {
    var emails = [],
        email = email.split('@');
    while(number > 0) {
      var genEmail = [
        email[0],
        '+',
        crypto.randomBytes(10).toString('hex'),
        '@',
        email[1]
      ];
      emails.push(genEmail.join(''));
      number--;
    }
    return emails;
  }

  function writeEmailsToFile(location, emails) {
    var file = fs.createWriteStream(location);
    emails.forEach(function(email) {file.write(email + ', \n')});
    file.end();
    console.log('File Created');
  }