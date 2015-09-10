/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */
var container = require('rhea');
/**
 * To authenticate using PLAIN and a simple username and password
 * combination, the application provides a callback function for
 * authenticating a connecting user given their specified username and
 * password. (The test used here - namely that the password is always
 * the username in reverse - is of course NOT recommended in practice!
 * :-)
 */
function authenticate(username, password) {
    console.log('Authenticating as ' + username);
    return username.split("").reverse().join("") === password;
}
container.sasl_server_mechanisms.enable_plain(authenticate);
var server = container.listen({'port':5672});
container.on('connection_open', function (context) {
    console.log('Connected!');
});
