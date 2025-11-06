import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Save } from 'lucide-react';

export function SystemSettings() {
  const [centerName, setCenterName] = useState('English Center Pro');
  const [email, setEmail] = useState('contact@englishcenterpro.com');
  const [hotline, setHotline] = useState('1900 1234');
  const [address, setAddress] = useState('123 Nguyen Hue St., District 1, Ho Chi Minh City');
  const [description, setDescription] = useState('High-quality English Language Center');

  const [adminName, setAdminName] = useState('Admin');
  const [adminEmail, setAdminEmail] = useState('admin@englishcenterpro.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [loginNotifications, setLoginNotifications] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('30');

  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  const handleSaveCenterInfo = () => {
    alert('Center information has been saved!');
  };

  const handleSaveAdminAccount = () => {
    if (newPassword && newPassword !== confirmPassword) {
      alert('Confirmation password does not match!');
      return;
    }
    alert('Admin account information has been updated!');
  };

  const handleSaveSecurity = () => {
    alert('Security settings have been saved!');
  };

  const handleSaveInterface = () => {
    alert('Interface settings have been saved!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">System Settings</h2>
        <p className="text-sm text-gray-600 mt-1">
          Manage system information and settings
        </p>
      </div>

      <Tabs defaultValue="center" className="w-full">
        <TabsList className="bg-white rounded-xl p-1">
          <TabsTrigger value="center" className="rounded-lg">
            Center Information
          </TabsTrigger>
          <TabsTrigger value="admin" className="rounded-lg">
            Admin Account
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-lg">
            Security
          </TabsTrigger>
          <TabsTrigger value="interface" className="rounded-lg">
            Interface
          </TabsTrigger>
        </TabsList>

        <TabsContent value="center" className="space-y-6 mt-6">
          <Card className="p-6 rounded-xl shadow-md">
            <h3 className="mb-6 text-gray-900">Basic Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="centerName">Center Name</Label>
                <Input
                  id="centerName"
                  value={centerName}
                  onChange={(e) => setCenterName(e.target.value)}
                  className="rounded-xl border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hotline">Hotline</Label>
                <Input
                  id="hotline"
                  value={hotline}
                  onChange={(e) => setHotline(e.target.value)}
                  className="rounded-xl border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="rounded-xl border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="rounded-xl border-gray-300"
                  rows={4}
                />
              </div>

              <Button
                onClick={handleSaveCenterInfo}
                className="bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl shadow-md"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="admin" className="space-y-6 mt-6">
          <Card className="p-6 rounded-xl shadow-md">
            <h3 className="mb-6 text-gray-900">Account Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="adminName">Display Name</Label>
                <Input
                  id="adminName"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className="rounded-xl border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminEmail">Email</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="rounded-xl border-gray-300"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-xl shadow-md">
            <h3 className="mb-6 text-gray-900">Change Password</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="rounded-xl border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="rounded-xl border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="rounded-xl border-gray-300"
                />
              </div>

              <Button
                onClick={handleSaveAdminAccount}
                className="bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl shadow-md"
              >
                <Save className="w-4 h-4 mr-2" />
                Update Account
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6 mt-6">
          <Card className="p-6 rounded-xl shadow-md">
            <h3 className="mb-6 text-gray-900">Security Settings</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p>Two-Factor Authentication (2FA)</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Enhance security for your account
                  </p>
                </div>
                <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p>Login Notifications</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Receive notifications for new logins
                  </p>
                </div>
                <Switch checked={loginNotifications} onCheckedChange={setLoginNotifications} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(e.target.value)}
                  className="rounded-xl border-gray-300 w-48"
                />
                <p className="text-sm text-gray-500">
                  Session will automatically end after this time period
                </p>
              </div>

              <Button
                onClick={handleSaveSecurity}
                className="bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl shadow-md"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Security Settings
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="interface" className="space-y-6 mt-6">
          <Card className="p-6 rounded-xl shadow-md">
            <h3 className="mb-6 text-gray-900">Interface Customization</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p>Dark Mode</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Enable/disable dark mode interface
                  </p>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p>Email Notifications</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Receive notifications via email
                  </p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p>Push Notifications</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Receive push notifications in browser
                  </p>
                </div>
                <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>

              <Button
                onClick={handleSaveInterface}
                className="bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl shadow-md"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
