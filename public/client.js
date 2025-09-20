// Basic client helper to manage showing username
(function(){
  function showUser(){
    const u = localStorage.getItem('sc_user');
    const el = document.getElementById('user-span');
    if(el) el.textContent = u ? `Logged in: ${u}` : '';
  }
  window.sc = {
    setUser: function(username){ localStorage.setItem('sc_user', username); showUser(); },
    clearUser: function(){ localStorage.removeItem('sc_user'); showUser(); }
  };
  document.addEventListener('DOMContentLoaded', showUser);
})();