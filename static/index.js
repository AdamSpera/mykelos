var title = document.getElementById('title');
var display = document.getElementById('display');

fetch('/getHostname', { method: 'GET' })
  .then(response => response.text())
  .then(text => {
    title.innerText = text;
    console.log(text)
  })

fetch('/getInterfaces', { method: 'GET' })
  .then(response => response.text())
  .then(text => {
    console.log(text)
    console.log(JSON.parse(text))

    var interfaces = JSON.parse(text);
    for (let i = 0; i < interfaces.length; i++) {
      if (!interfaces[i].intf.includes('lan')) {
        let btn = document.createElement("button");
        btn.innerText = interfaces[i].intf;
        btn.onclick = function () {
          console.log(`${interfaces[i]}: Button is clicked`);
          display.innerText = `IP Address: ${interfaces[i].ipaddr}\nStatus: ${interfaces[i].status} `;
        };
        document.body.appendChild(btn);
      }
    }

  })
