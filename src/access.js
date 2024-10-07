
import { ___ } from "./hosts.cypher";
import { AES, enc } from "crypto-js";

var cypher  = AES.decrypt(___, 'U2FsdGVkX18priCtyp9HURRhvQsxfN0rSA+xnwFc8Es=');
var hosts = JSON.parse(cypher.toString(enc.Utf8));

if (!hosts.includes(location.host)){
  $('#content_frame').html('<span style="display: block; text-align:center; margin: 100px auto">No Content Available</span>');
  $('.sidebar-body').html('<span style="display: block; text-align:center; margin: 50px auto">No Content Available</span>')
  $('.header').html('<span>- - -</span>');
  document.title = '- - -'
}