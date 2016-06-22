@include('layout.header')
<md-sidenav class="md-sidenav-left md-whiteframe-z2" md-component-id="left">
    <md-toolbar layout="row" layout-align="center center" class="black white-bg" style="padding: 8px 0;">
        <div flex="70">
            <h1 class="md-toolbar-tools">Menu</h1>
        </div>
        <div flex="30" layout="row" layout-align="end center">
            <md-button class="md-icon-button" ng-click="mainController.close()" aria-label="Clear">
                <i class="material-icons black">clear</i>
            </md-button>
        </div>
    </md-toolbar>
    <md-content flex>
        <md-list ng-cloak>
            <md-list-item><a href="/s" ui-sref="settings">Settings</a></md-list-item>
            <md-list-item>Second Item</md-list-item>
            <md-list-item>Third Item</md-list-item>
        </md-list>
    </md-content>
</md-sidenav>
<md-content layout="column" role="main" style="overflow:hidden;">
    <md-toolbar class="dark-blue-bg" layout="row" flex="10">
        <div class="md-toolbar-tools dark-blue-bg" flex-offset-gt-md="15" flex="100" flex-gt-md="70" layout="row" layout-fill layout-padding>
            <md-button class="md-icon-button" aria-label="Menu" ng-click="mainController.toggleLeft()">
                <i class="material-icons">menu</i>
            </md-button>
            <div flex="70">
                <span>Retro Games</span>
            </div>
            <md-menu layout="row" layout-align="end center" flex>
                <md-button aria-label="Open profile menu" class="md-icon-button" ng-click="mainController.openMenu($mdOpenMenu, $event)">
                    <i class="material-icons">settings</i>
                </md-button>
                <md-menu-content width="4">
                    <md-menu-item>
                        <md-button ng-click="mainController.redial($event)">
                            <md-icon><i class="material-icons">notifications</i></md-icon>
                            <span>Notifications</span>
                        </md-button>
                    </md-menu-item>
                    <md-menu-divider></md-menu-divider>
                    <md-menu-item>
                        <md-button ng-click="mainController.checkVoicemail()" layout-align="start center" style="vertical-align:top;">
                            <md-icon><i class="material-icons">poll</i></md-icon>
                            <span>Stats</span>
                        </md-button>
                    </md-menu-item>
                </md-menu-content>
            </md-menu>
        </div>
    </md-toolbar>
    <md-content layout-fill>
        <section flex-offset-gt-md="15" flex="100" flex-gt-md="70" layout="column" layout-padding ui-view></section>
    </md-content>
</md-content>
@include('layout.footer')
