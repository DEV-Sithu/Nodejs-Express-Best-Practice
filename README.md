# အဆင့် ၁ 
D အောက်မှာ New Folder ဆောက်ထား  mkdir my-express-app CMD  ကိုဖွင့် D:>FolderName> ရအောင်ပြောင်း
```
C:\Users\user>cd..
C:\Users>cd ..
C:\>D:
D:\>cd \foldername
```

# အဆင့် ၂
Use ‘npm init -y’ for default initialization
> npm init (npm initialization လုပ်လို့ပြောတာ
အဲ့တာကို yes လား no လားမေးတာမို့ -y လို့ထဲ့ပေးတာ)

# အဆင့် ၃
express install လုပ်မယ်  npm install express ြပီးရင် code လို့ရိုက် vscode ကိုတန်းရောက်မယ် 

> Express Server က Http Server code တွေရေးကတာထက်ပိုပြီးရိုးရှင်းမယ် lightweight ဖစ်မယ်  middleware တွေ  http method တေွကိုချိတ်ဆက်ပေးပြီး သုံးရလွယ်တဲံ Rest Api library တစ်ခုဖစ်တယ်

```Project Structure
src/
├── config/         # Environment configurations
├── controllers/    # Route controllers
├── routes/         # Route definitions
├── middleware/     # Custom middleware
├── models/         # Database models
├── services/       # Business logic
├── utils/          # Helper functions
├── validations/    # Validation schemas
├── tests/          # Test suites
├── app.js          # Main app entry
└── initialization
```

# အဆင့် ၄
app.js codeရေး 
```const express = require('express');

const app = express();
const PORT = 3000;

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, 
                   and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);
```
- server စရင် run termial မှာ node server.js  Your server is now live at http://localhost:3000.
- server ရပ်ချင်ရင် Ctrl+C

# အဆင့် ၅
လိုတဲ့ library တွေ install မယ် (package.json ထဲမာ မပေါရင် npm install libararyname --save 
1. npm install mysql2 (MySql)
2. npm install nodemon (Server Restart)
3. npm install dotenv  (Enviroment or Flavor)
4. npm install body-parser (Parse incoming request bodies in a middleware)
5. npm install jsonwebtoken (0auth token)
6. npm install bcryptjs (encryption)
7. npm install --save-dev cross-env (NODE_ENV=production)
8. npm i helmet --save (setting HTTP response headers for security practice)
9. npm i express-rate-limit ( to limit repeated requests to public APIs and/or endpoints such as password reset for security practice)
10. npm install cors (ORS-enabled for all origins for security practice)    
```
"dependencies": {
    "bcryptjs": "^5.1.1",
    "body-parser": "^1.20.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "express-rate-limit": "^7.5.0",
    "helmet": "^8.0.0",
    "jsonwebtoken": "^9.0.2",
    "mysql2": "^3.12.0",
    "nodemon": "^3.1.9"
  },
  "devDependencies": {
    "cross-env": "^7.0.3"
  }
```
#  အဆင့် ၆
Enviroment file (.env) 
> variable တွေ api key တွေ database config တေွွကို တစ်နေရာထဲမှာ သတ်မှတ်ပေးမယ် လုံခြုံမှုရှိစေဖို့ git commit မလုပ်ရဘူး .gitignore မှာဖွတ်ဖို့ထဲ့ရေးထားပါ
- .env.development
- .env.production
- .env.localhost

.gitignore ဖိုင်ဆောက်
```  env
node_modules/*
package-lock.json
.idea/*
```  
ဒီ variable တွေကို api service မှာ ပြန်ပြီး assign လုပ်ရမယ် 
```   
NODE_ENV=localhost
JWT_SECRET=e3b6846750214cf67d35ae5be45750a96a2543dac426c162aa6f04e5ec5f0010
JWT_EXPIRES_IN=1h
APP_PORT=3000
DB_PORT=3306
DB_HOST=localhost
DB_USER =root
DB_PASS=
MYSQL_DB=dbname
```
JWT Token Generator [https://jwtsecret.com/generate]

## package.json ထဲက script မှာ
```  
 "scripts": {
    "start": "nodemon app.js",
    "start:development": "cross-env NODE_ENV=development node app.js",
    "start:localhost": "cross-env NODE_ENV=localhost node app.js",
    "start:production": "cross-env NODE_ENV=production node app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```           
run ချင်ရင် ဘယ်ဟာနဲ့ ရွေးပြီး run မလဲဖစ်မယ် start:localhost လေးကိုcursorချ Run scriptနဲ့ရွေး errorတတ်တာဖစ်ဖစ် server stopချင်ဖစ်ဖစ် delete icon နိုပ်
 node app.js ကို flavor ခွဲပေးထားတာ

# အဆင့် ၇ 
app.js မှာရေး
```   
// dot env variableတွေimportလုပ်တာ
require('dotenv').config();
// app.js ထဲမာဒီjsမှာခသူံးမာလောက်ပဲimport
const express = require('express');
const bodyparser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

// express app serverတစ်ခုဆောက်ပီ
const app = express();

// middleware 
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(helmet());
app.use(cors());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));

//env ဖိုင်ကွဲတွေထဲကမှ runထားတဲ့nodeရဲ့variable
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

// Route တွေ ရေးရမယ်
// User 
const v1UserRoutes = require('./routes/v1/userRoutes');
const v2UserRoutes = require('./routes/v2/userRoutes');
app.use('/v1', v1UserRoutes);
app.use('/v2', v2UserRoutes);

// Auth
const v1AuthRoutes = require('./routes/v1/authRoutes');
app.use('/v1', v1AuthRoutes);

// version ခွဲတာနဲ့ပတ်သက်ပြီးရေးဝာာ
const versionMiddleware = require('./middleware/versioning');

// လက်ရှိဘယ်versionကိုသုံးနေပီသတ်မှတ်
app.use(versionMiddleware('v1')); // Default to v1

// api ကနေလဲ checkversionနဲ့စစ်ရင်သိရအောင်
app.get('/checkVersion', (req, res) => {
  if (req.version === 'v1') {
    res.send('Response from v1');
  } else if (req.version === 'v2') {
    res.send('Response from v2');
  }
});

const port = process.env.APP_PORT || 5000;

// serverအလုပ်လုပ်မလုပ် စစ်တာ
app.get("/", (req, res) => {
  res.json({ message: "Best Practice Code for Node Js Express with MySql" });
});

// app ကို တောက်လျောက် run ခိုင်းထားတာ
app.listen(port, function (error) {
    if (error) throw error
    console.log("Server created Successfully on PORT", port);
  });

```
# အဆင့် ၈
database.js မှာ mongodb သုံးမှာလား mysql သုံးမှာလားရွေးချယ်နိုင်ပါတယ် လောလောဆယ် mysql2 ကိုသုံးရင်ရေးနည်း database connection မမိဘူးဆိုရင်မှားတတ်တာက app.js မှာ require('dotenv').config(); ရေးဖိူ့ကျန်နေလို့ 
 app.js မှာမရေးဖစ်လဲ database.js မှာ dotenv ကို config ရေးရင်လဲအဆင်ပြေနိုင်တယ် နောက် app main entry ကနေခွဲထွက်ပြီး‌ရေးတဲ့ js တိုင်း import export လိုတယ် const တစ်ခုဆောက်ပြီးတိုင်း module.exports ထဲပြန်ထဲ့ရမယ်
```
const {createPool} = require('mysql2/promise');
require('dotenv').config();

const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
});

module.exports = pool;
```
# အဆင့် ၉
 - Routes ( MVC , model view controller ကို url ပတ်လမ်းနဲ့ခေါသုံးနိုင်ဖို့ဖစ်တယ် controller ကိုခေါသူံးရမယ်)
 - Controllers ( services ကဒေတာတွေကို client ဆီ json format နဲ့ ပြန်ပို့ပေးမယ် data json လား error status တွေလား
 - Services ( model ကဒေတာကို controller နဲ့ချိတ်ဆက်ပေးမယ်)
 - Models  ( Model object တစ်ခုဆောက်မယ် sql qurey တစ်ခါထဲရေးမယ်)
   ---
* require(ဖိုင်လမ်းကြောင်း ); ဘယ်js ဖိုင်ကိုပြန်‌ခေါသုံးမယ်လို့ဆိုလိုတာပါ
* const user = require(ဖိုင်လမ်းကြောင်း ); user.js ဖိုင်ကို ဒီ js မှာ constant တစ်ခုအနေနဲ့သုံးမယ်လို့ဆိုလိုတာပါ
* require ('./routes'); routes ဖိုင်က main ဖိုင်အောက်မှာလို့ဆိုလိုတာ
* require ('../../config/database);   ../ က cd space နဲ့တူတယ် config ဖိုင်ကနေနောက်ကိုနှစ်ဆင့်ဆို main folder ကိုသိမယ်
* require ('module node name') ဥပမာ express install ထားပြီး ခေါသုံးရင် require('express')

# အဆင့် ၁၀
Model class (Dao တွေဖစ်တဲ့ Data Object) ဆောက်ရမယ် ဒါပေမဲ့ Java လိုတော့့မဟုတ်ဘုး field name တွေပေးဖို့မလိုဘူး sql query logic တွေစု‌ရေးထားရင်ရပီ  findAll() , findOne() , insert() , update(), delete()
စတဲ့ function တွေကို ဘယ် service တွေကမဆို ဘုံယူသုံးနိုင််တယ် အဲ့လိုအားသာချက်တွေရှိလာမယ် 
```
const pool = require("../../config/database");

class User {
  // insert query ရေးတာ pool.execute()
  static async create(data) {
    const result = await pool.execute(
     `insert into user
              (user_name, password, email, role) 
              values(?,?,?,?)`,
      [
        data.user_name,
        data.password,
        data.email,
        data.role
      ]
    );
    return result.insertId;
  }
  // [rows] နဲ့ပြန်မဖမ်းချင်ရင် return တန်းပြန်ပေးလဲရတယ်
  static async findAll() { 
    const [rows] = await pool.query('SELECT * FROM user');
    return rows;
  }
  // findViewById ရေးနည်း  [rows] နဲ့ဖမ်းရမယ် data တစ်ခုဘဲလိုတာမို့ rows[0] ခန်းပြန်တာ
  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM user WHERE user_id = ?', [id]);
    return rows[0];
  }

  static async findByAccount(email,password) {
    const [rows] = await pool.execute('SELECT * FROM user WHERE email= ? and password=?', [email,password]);
    return rows[0];
  }
  static async findByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM user WHERE email = ?', [email]);
    return rows[0];
  }

  static async update( data) {
    await pool.execute(
        `update user set user_name=?, password=?, role=?, email=? where user_id = ?`,
      [
        data.user_name,
        data.password,
        data.role,
        data.email,
        data.user_id
      ],
    );
    return true;
  }

  static async delete(id) {
    await pool.execute('DELETE FROM user WHERE user_id = ?', [id]);
    return true;
  }
}
// user class ကို node module ထဲကို export လုပ်ဖို့မမေ့နဲ့ မေ့ရင်တခြား class တွေကနေခေါရင်မသိဘူး any ဖစ်နေတတ်တယ် 
module.exports = User;
```
# အဆင့် ၁၁
Service အပိုင်းမှာရေးရမှာတွေက  userService.js  ဖိုင်ဆောက်
```
// usermodel ကို import လုပ်ပြီး const user လို့သတ်မှတ် ဒါဆို usermodel ထဲကfunction တွေယူသုံးလို့ရပီ
const user = require('../../models/v1/userModel');

class UserService {
  // static method တွေဆောက်ပီး model နဲ့ controller ကြားခံလုပ်မယ် 
  static async createUser_v1(userData) {
    // insert လုပ်ရင် duplicate data မဖစ်အောင် စစ်ထုတ်ထားရမယ်
    const existingUser = await user.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    return user.create(userData);
  }

  static async login_v1(email,password) {
    return user.findByAccount(email,password);
  }

  static async getUserByUserId_v1(id) {
    return user.findById(id);
  }

  static async getUsers_v1() {
    return user.findAll();
  }

  static async updateUser_v1(userData) {
    return user.update(userData);
  }

  static async deleteUser_v1(id) {
    return user.delete(id);
  }
}
// userservice class ကို module.exports မလုပ်မိရင် controller ကနေ မသိနိုင်ပါဘူး
module.exports = UserService;
```
# အဆင့် ၁၂
controller အပိုင်း userController.js
```
// require file pathနဲ့ပတ်သက်ပြီးအသေးစိတ်ပြောပြထားပြီးပါပီ ပတ်လမ်းမှားရင် color highlight မလင်းလာပါဘူး link မဖစ်ပါဘူး 
const userService  = require('../../services/v1/userServices.js');

// UserController class မဆောက်ဘဲ asyn func = fun name အဲ့ function name ကို module ထဲတန်းပြီး export လုပ်လိုက်တာပါဲ


module.exports.createUser_v1 = async (req, res, next) => {
  try {
    // service က‌ဒေတာကို client ဆီ json format နဲ့ ပို့တာပါ
    const results = await userService.createUser_v1(req.body);
    res.status(200).json({
          success: 1,
          data: results
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserByUserId_v1 = async (req, res, next) => {
  try {
    const user_id = req.query.user_id;
    const results = await userService.getUserByUserId_v1(user_id);
    res.status(200).json({
      success: 1,
          data: results
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getUsers_v1 = async (req, res, next) => {
  try {
    const results = await userService.getUsers_v1(req.body);
    res.status(200).json({
          success: 1,
          data: results
    });
  } catch (error) {
    next(error);
  }
};
  
module.exports.updateUsers_v1 = async (req, res, next) => {
  try {
    await userService.updateUser_v1(req.body);
    res.status(200).json({
          success: 1,
          message: " update successfully "
    });
  } catch (error) {
    next(error);
  }
};
  
module.exports.deleteUser_v1 = async (req, res, next) => {
  try {
    const user_id = req.body.user_id;
    await userService.deleteUser_v1(user_id);
    res.status(200).json({
          success: 1,
          message: " deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};   
```  

# အဆင့် ၁၃
> Get ,Post ,Put ,PATCH, Delete
- router တစ်ခုမှာ CRUD တစ်ခုထပ်ပိုပါလဲရတယ် ရေးရမဲ့ format လေးတွေရှိတယ်
- (baseurl/v1/users) 
 route အပိုင်းအတွက် userRoutes.js ရေး
``` 
const router = require("express").Router();
const userController = require('../../controllers/v1/userController.js');
const authMiddleware = require('../../middleware/authMiddleware.js');


router.get('/users/', userController.getUsers_v1); 
router.post("/users/",userController.createUser_v1);
router.put("/users/",  userController.updateUsers_v1);
router.delete("/users/", userController.deleteUser_v1);

// Protected Route
router.get("/users/id/:user_id?",authMiddleware.authenticateToken,  userController.getUserByUserId_v1);
``` 

module.exports = router;

  

## Version ခွဲရေးနည်း
 > project မှာ feature အသစ်တွေထဲ့ရလို့ ရှိပြီးသား api တွေမှာ database တွေမှာ changes တွေရှိလာရင် version ခွဲထုတ်ပြီး front end တွေကို api ပြန်ပို့ရမယ် ကို့project မှာတစ်ခါထဲ folder structure လေးခွဲရေးထားမယ်ဆို version ချိန်းတဲ့အခါ အများကြီးပြင်ရေးစရာမလိုတော့ဘူး  routes ,service,model,controller folder တွေအောက်မှာ  v1 , v2 > user_model_v1.js , user_model_v2.js , စသဖြင့်ခွဲရေးထားရင် ရပီ
```
// Route တွေ ရေးရမယ်
// User 
const v1UserRoutes = require('./routes/v1/userRoutes');
const v2UserRoutes = require('./routes/v2/userRoutes');
app.use('/v1', v1UserRoutes);
app.use('/v2', v2UserRoutes);

// version ခွဲတာနဲ့ပတ်သက်ပြီးရေးဝာာ
const versionMiddleware = require('./middleware/versioning');

// လက်ရှိဘယ်versionကိုသုံးနေပီသတ်မှတ်
app.use(versionMiddleware('v1')); // Default to v1
```
# HTTP Methods များနှင့် အသုံးပြုပုံ 
Method	အဓိပ္ပာယ်	ဥပမာ
- GET	အချက်အလက်ရယူခြင်း	GET /users
- POST	အသစ်ဖန်တီးခြင်း	POST /users (JSON body)
- PUT	အရာအားလုံးကို အစားထိုးခြင်း	PUT /users/123
- PATCH	တစ်စိတ်တစ်ပိုင်းပြင်ခြင်း	PATCH /users/123
- DELETE	အရာကို ဖျက်ခြင်း	DELETE /users/123

#  REST API တွင် အသုံးများသော Status Codes
```
Code	အဓိပ္ပာယ်
200	OK (အောင်မြင်ပါသည်)
201	Created (အသစ်ဖန်တီးပြီး)
400	Bad Request (တောင်းဆိုမှုမှားယွင်း)
401	Unauthorized (ခွင့်ပြုချက်မရှိ)
404	Not Found (ရှာမတွေ့)
500	Server Error (Server အမှား)
```
# REST API ဒီဇိုင်းဆွဲရန် အချက်များ
- URI ကို နာမ်များဖြင့် သတ်မှတ်ပါ
- မှားနေသော ဥပမာ: /getUsers
- မှန်ကန်သော ဥပမာ: /users
- စာရင်းများအတွက် ဗဟုဝုစ်နာမ်သုံးပါ
- ဥပမာ: /users၊ /products
- Query Parameters များဖြင့် စီစစ်ပါ
- ဥပမာ: /users?role=admin&page=2
  
# လုံခြုံရေး (Security)
- HTTPS ကို အမြဲသုံးပါ။
- OAuth 2.0 သို့မဟုတ် JWT တို့ဖြင့် ခွင့်ပြုချက်များကို စီမံပါ။
- Rate Limiting ထည့်သွင်းပါ (ဥပမာ - တစ်မိနစ်လျှင် 100 ကြိမ်သာ Request ပို့နိုင်သည်)။
