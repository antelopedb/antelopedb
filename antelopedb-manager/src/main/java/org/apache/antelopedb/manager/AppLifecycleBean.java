/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.apache.antelopedb.manager;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;

import io.quarkus.runtime.ShutdownEvent;
import io.quarkus.runtime.StartupEvent;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

@ApplicationScoped
public class AppLifecycleBean {

    @ConfigProperty(name = "greeting.message")
    String message;

    private static final Logger LOGGER = Logger.getLogger("ListenerBean");

    void onStart(@Observes StartupEvent ev) {
        System.out.println("AntelopeDB starting...");
        LOGGER.info("The application is starting..." + message);
    }

    void onStop(@Observes ShutdownEvent ev) {
        System.out.println("AntelopeDB stopping...");
        LOGGER.info("The application is stopping...");
    }

}