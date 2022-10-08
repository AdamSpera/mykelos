document.getElementById("cisco").addEventListener("click", function() {
  if (document.getElementById("checkbox").checked) {
    fetch('/rememberChoice', { method: 'POST', body: JSON.stringify({ userChoice: 'cisco' }) })
    .then(res => res.json())
    .then(res => {
      console.log(res);
    });
  }
  location.href='/cisco';
});
document.getElementById("hp").addEventListener("click", function() {
  if (document.getElementById("checkbox").checked) {
    fetch('/rememberChoice', { method: 'POST', body: JSON.stringify({ userChoice: 'hp' }) })
    .then(res => res.json())
    .then(res => {
      console.log(res);
    });
  }
  location.href='/hp';
});
document.getElementById("aruba").addEventListener("click", function() {
  if (document.getElementById("checkbox").checked) {
    fetch('/rememberChoice', { method: 'POST', body: JSON.stringify({ userChoice: 'aruba' }) })
    .then(res => res.json())
    .then(res => {
      console.log(res);
    });
  }
  location.href='/aruba';
});