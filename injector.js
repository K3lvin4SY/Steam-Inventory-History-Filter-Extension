async function InjectScripts() {
  const resp1 = await fetch(chrome.runtime.getURL('./js/contentLoader.js'));
  const injectedCode1 = await resp1.text();
  console.log("injectedCode1")
  var script1 = document.createElement("script");
  script1.textContent = injectedCode1;
  (document.head).appendChild(script1);

  const resp2 = await fetch(chrome.runtime.getURL('./js/content.js'));
  const injectedCode2 = await resp2.text();
  var script2 = document.createElement("script");
  script2.textContent = injectedCode2;
  (document.head).appendChild(script2);

  const resp3 = await fetch(chrome.runtime.getURL('./js/element_Links.js'));
  const injectedCode3 = await resp3.text();
  var script3 = document.createElement("script");
  script3.textContent = injectedCode3;
  (document.head).appendChild(script3);
}
InjectScripts()