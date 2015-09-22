var natural = require('natural');
var spell = require('./speller.js')
var fs = require('fs');
var wordnet = new natural.WordNet();
var nounInflector = new natural.NounInflector();
var tokenizer = new natural.WordTokenizer();
var verbInflector = new natural.PresentVerbInflector();
var stemmer = natural.PorterStemmer;

var trainingtext = "./query/nsc.txt";
var commonwords = ["say","make","know","time","year","think","people","just","come","want","way","look","new","day","use","man","thing","tell","good","woman","life","child","work","world","school","try","ask","need","feel","state","high","really","family","leave","old","mean","student","let","great","big","group","begin","country","help","talk","turn","problem","start","hand","American","case","week","company","right","program","hear","question","play","government","run","small","number","night","live","Mr","point","believe","hold","today","bring","happen","large","million","home","water","room","write","mother","area","national","money","story","young","fact","month","different","lot","study","book","eye","job","word","business","issue","kind","head","far","black","long","little","house","yes","provide","service","friend","important","father","sit","away","power","hour","game","line","political","end","stand","bad","lose","member","pay","law","meet","car","city","include","continue","set","later","community","white","president","learn","real","change","team","minute","best","idea","kid","body","information","ago","lead","social","understand","watch","follow","parent","stop","face","create","public","speak","read","level","allow","add","office","spend","door","health","person","art","sure","war","history","party","grow","result","open","morning","walk","reason","low","win","research","girl","guy","early","food","moment","air","teacher","force","offer","education","remember","foot","second","boy","maybe","able","age","policy","love","process","music","including","consider","appear","actually","buy","probably","human","wait","serve","market","die","send","expect","sense","build","stay","fall","oh","nation","plan","cut","college","death","course","experience","reach","local","kill","remain","effect","yeah","suggest","class","control","raise","care","late","hard","field","pass","sell","major","require","development","report","role","better","economic","effort","decide","rate","strong","possible","heart","drug","leader","light","voice","wife","police","mind","finally","pull","return","free","military","price","according","decision","explain","son","hope","develop","view","relationship","carry","town","road","drive","arm","true","federal","break","difference","thank","receive","value","international","building","action","model","join","season","society","tax","director","position","player","agree","especially","record","pick","wear","paper","special","space","ground","form","support","event","official","matter","center","couple","site","project","hit","base","activity","star","table","court","produce","eat","teach","oil","half","situation","easy","cost","industry","figure","street","image","phone","data","cover","quite","picture","clear","practice","piece","land","recent","product","doctor","wall","patient","worker","news","test","movie","certain","north","personal","simply","technology","catch","step","baby","computer","type","attention","draw","film","Republican","tree","source","red","nearly","organization","choose","cause","hair","century","evidence","window","difficult","listen","soon","culture","billion","chance","brother","energy","period","summer","realize","available","plant","likely","opportunity","term","short","letter","condition","choice","single","rule","daughter","administration","south","husband","Congress","floor","campaign","material","population","economy","medical","hospital","church","close","thousand","risk","current","future","wrong","involve","defense","increase","security","bank","certainly","west","sport","board","seek","subject","officer","private","rest","behavior","deal","performance","fight","throw","quickly","past","goal","bed","order","author","represent","focus","foreign","drop","blood","agency","push","nature","color","recently","store","reduce","sound","note","fine","near","movement","page","enter","share","common","poor","natural","race","concern","series","significant","similar","hot","language","usually","response","dead","rise","animal","factor","decade","article","shoot","east","save","seven","artist","scene","stock","career","despite","central","treatment","happy","exactly","protect","approach","lie","size","dog","fund","occur","media","ready","sign","thought","list","individual","simple","quality","pressure","accept","answer","resource","identify","left","meeting","determine","prepare","disease","success","argue","cup","particularly","ability","staff","recognize","indicate","character","growth","loss","degree","wonder","attack","region","television","box","TV","training","pretty","trade","election","everybody","physical","lay","general","feeling","standard","message","fail","outside","arrive","analysis","benefit","sex","forward","lawyer","present","section","environmental","glass","skill","sister","PM","professor","operation","financial","crime","stage","ok","compare","authority","miss","design","sort","act","knowledge","gun","station","blue","strategy","clearly","discuss","truth","song","example","democratic","check","environment","leg","dark","various","laugh","guess","executive","prove","hang","entire","rock","forget","claim","remove","manager","enjoy","network","legal","religious","cold","final","main","science","green","memory","card","seat","cell","establish","nice","trial","expert","spring","firm","Democrat","radio","visit","management","avoid","imagine","tonight","huge","ball","finish","theory","impact","respond","statement","maintain","charge","popular","traditional","reveal","direction","weapon","employee","cultural","contain","peace","pain","apply","measure","wide","shake","fly","interview","manage","chair","fish","particular","camera","structure","politics","perform","bit","weight","suddenly","discover","candidate","production","treat","trip","evening","affect","inside","conference","unit","style","adult","worry","range","mention","deep","edge","specific","writer","trouble","necessary","challenge","fear","shoulder","institution","middle","sea","dream","bar","beautiful","property","instead","improve","stuff","method","somebody","magazine","hotel","soldier","reflect","heavy","sexual","bag","heat","marriage","tough","sing","surface","purpose","exist","pattern","skin","agent","owner","machine","gas","ahead","generation","commercial","address","cancer","item","reality","coach","Mrs","yard","beat","violence","total","tend","investment","discussion","finger","garden","notice","collection","modern","task","partner","positive","civil","kitchen","consumer","shot","budget","wish","painting","scientist","safe","agreement","capital","mouth","victim","newspaper","threat","responsibility","smile","attorney","score","account","interesting","audience","rich","dinner","vote","western","relate","travel","debate","prevent","citizen","majority","born","admit","senior","assume","wind","key","professional","mission","fast","customer","suffer","speech","successful","option","participant","southern","fresh","eventually","forest","video","global","Senate","reform","access","restaurant","judge","publish","relation","release","bird","opinion","credit","critical","corner","concerned","recall","version","stare","safety","effective","neighborhood","original","troop","income","directly","hurt","species","immediately","track","basic","strike","sky","freedom","absolutely","plane","achieve","object","attitude","labor","refer","concept","client","powerful","perfect","conduct","announce","conversation","examine","touch","attend","completely","variety","sleep","involved","investigation","nuclear","researcher","press","conflict","spirit","replace","British","encourage","argument","camp","brain","feature","afternoon","weekend","dozen","possibility","insurance","department","battle","beginning","date","generally","African","sorry","crisis","complete","fan","stick","define","easily","hole","element","vision","status","normal","Chinese","ship","solution","stone","slowly","scale","university","introduce","driver","attempt","park","spot","lack","ice","boat","drink","sun","distance","wood","handle","truck","mountain","survey","supposed","tradition","winter","village","Soviet","refuse","sales","roll","communication","screen","gain","resident","hide","gold","club","farm","potential","European","presence","independent","district","shape","reader","Ms","contract","crowd","Christian","express","apartment","willing","strength","previous","band","obviously","horse","interested","target","prison","ride","guard","terms","demand","reporter","deliver","text","tool","wild","vehicle","observe","flight","facility","understanding","average","emerge","advantage","quick","leadership","earn","pound","basis","bright","operate","guest","sample","contribute","tiny","block","protection","settle","feed","collect","additional","highly","identity","title","lesson","faith","river","promote","living","count","unless","marry","tomorrow","technique","path","ear","shop","folk","principle","survive","lift","border","competition","jump","gather","limit","fit","equipment","worth","associate","critic","warm","aspect","insist","failure","annual","French","Christmas","comment","responsible","affair","procedure","regular","spread","chairman","baseball","soft","ignore","egg","belief","demonstrate","anybody","murder","gift","religion","review","editor","engage","coffee","document","speed","cross","influence","threaten","commit","female","youth","wave","afraid","quarter","background","native","broad","wonderful","deny","apparently","slightly","reaction","twice","suit","perspective","growing","blow","construction","intelligence","destroy","cook","connection","burn","shoe","grade","context","committee","hey","mistake","location","clothes","Indian","quiet","dress","promise","aware","neighbor","function","bone","active","extend","chief","combine","wine","cool","voter","learning","bus","hell","dangerous","remind","moral","United","category","relatively","victory","academic","Internet","healthy","negative","following","historical","medicine","tour","depend","photo","finding","grab","direct","classroom","contact","justice","participate","daily","fair","pair","famous","exercise","knee","flower","tape","hire","familiar","appropriate","supply","fully","actor","birth","search","tie","democracy","eastern","primary","yesterday","circle","device","progress","island","exchange","clean","studio","train","lady","colleague","application","neck","lean","damage","plastic","tall","plate","hate","writing","male","alive","expression","football","intend","chicken","army","abuse","theater","shut","map","extra","session","danger","welcome","domestic","lots","literature","rain","desire","assessment","injury","respect","northern","nod","paint","fuel","leaf","dry","Russian","instruction","pool","climb","sweet","engine","fourth","salt","expand","importance","metal","fat","ticket","software","disappear","corporate","strange","lip","reading","urban","mental","increasingly","lunch","educational","farmer","sugar","planet","favorite","explore","obtain","enemy","greatest","complex","surround","athlete","invite","repeat","carefully","soul","scientific","impossible","panel","meaning","mom","married","instrument","predict","weather","presidential","emotional","commitment","Supreme","bear","pocket","temperature","surprise","poll","proposal","consequence","breath","sight","balance","adopt","minority","straight","connect","works","teaching","belong","aid","advice","okay","photograph","regional","trail","novel","code","organize","jury","breast","Iraqi","acknowledge","theme","storm","union","desk","thanks","fruit","expensive","yellow","conclusion","prime","shadow","struggle","conclude","analyst","dance","regulation","ring","largely","shift","revenue","mark","locate","county","appearance","package","difficulty","bridge","recommend","obvious","basically","e-mail","generate","anymore","propose","thinking","possibly","trend","visitor","loan","currently","comfortable","investor","profit","angry","crew","accident","meal","hearing","traffic","muscle","notion","capture","prefer","truly","earth","Japanese","chest","thick","cash","museum","beauty","emergency","unique","internal","ethnic","link","stress","content","select","root","nose","declare","appreciate","actual","bottle","hardly","setting","launch","file","sick","outcome","ad","defend","duty","sheet","ought","ensure","Catholic","extremely","extent","component","mix","long-term","slow","contrast","zone","wake","airport","brown","shirt","pilot","warn","ultimately","cat","contribution","capacity","estate","guide","circumstance","snow","English","politician","steal","pursue","slip","percentage","meat","funny","soil","surgery","correct","Jewish","blame","estimate","basketball","golf","investigate","crazy","significantly","chain","branch","combination","frequently","governor","relief","user","dad","kick","manner","ancient","silence","rating","golden","motion","German","gender","solve","fee","landscape","used","bowl","equal","forth","frame","typical","conservative","eliminate","host","hall","trust","ocean","row","producer","afford","regime","division","confirm","fix","appeal","mirror","tooth","smart","length","entirely","rely","topic","complain","variable","telephone","perception","attract","confidence","bedroom","secret","debt","rare","tank","nurse","coverage","opposition","aside","bond","pleasure","master","era","requirement","fun","expectation","wing","separate","somewhat","pour","stir","judgment","beer","reference","tear","doubt","grant","seriously","minister","totally","hero","industrial","cloud","stretch","winner","volume","seed","surprised","fashion","pepper","busy","intervention","copy","tip","cheap","aim","cite","welfare","vegetable","gray","dish","beach","improvement","opening","overall","divide","initial","terrible","oppose","contemporary","route","multiple","essential","league","criminal","careful","core","upper","rush","necessarily","specifically","tired","employ","holiday","vast","resolution","household","fewer","abortion","apart","witness","match","barely","sector","representative","beneath","incident","limited","proud","flow","faculty","increased","waste","merely","mass","emphasize","experiment","definitely","bomb","enormous","tone","liberal","massive","engineer","wheel","decline","invest","cable","expose","rural","AIDS","Jew","narrow","cream","secretary","gate","solid","hill","typically","noise","grass","unfortunately","hat","legislation","succeed","celebrate","achievement","fishing","accuse","useful","reject","talent","taste","characteristic","milk","escape","cast","sentence","unusual","closely","convince","height","physician","assess","plenty","virtually","addition","sharp","creative","lower","approve","explanation","gay","campus","proper","guilty","acquire","compete","technical","plus","immigrant","weak","illegal","hi","alternative","interaction","column","personality","signal","curriculum","honor","passenger","assistance","forever","regard","Israeli","association","knock","wrap","lab","display","criticism","asset","depression","spiritual","musical","journalist","prayer","suspect","scholar","warning","climate","cheese","observation","childhood","payment","sir","permit","cigarette","definition","priority","bread","creation","graduate","request","emotion","scream","dramatic","universe","gap","excellent","deeply","prosecutor","lucky","drag","airline","library","agenda","recover","factory","selection","primarily","roof","unable","expense","initiative","diet","arrest","funding","therapy","wash","schedule","sad","brief","housing","post","purchase","existing","steel","regarding","shout","remaining","visual","fairly","chip","violent","silent","suppose","self","bike","tea","perceive","comparison","settlement","layer","planning","description","slide","widely","wedding","inform","portion","territory","immediate","opponent","abandon","lake","transform","tension","leading","bother","consist","alcohol","enable","bend","saving","desert","shall","error","cop","Arab","double","sand","Spanish","print","preserve","passage","formal","transition","existence","album","participation","arrange","atmosphere","joint","reply","cycle","opposite","lock","deserve","consistent","resistance","discovery","exposure","pose","stream","sale","pot","grand","hello","coalition","tale","knife","resolve","racial","phase","joke","coat","Mexican","symptom","manufacturer","philosophy","potato","foundation","quote","online","negotiation","urge","occasion","dust","breathe","elect","investigator","jacket","glad","ordinary","reduction","rarely","pack","suicide","numerous","substance","discipline","iron","practical","passion","volunteer","implement","essentially","gene","enforcement","vs","sauce","independence","marketing","priest","amazing","intense","advance","employer","shock","inspire","adjust","retire","visible","kiss","illness","cap","habit","competitive","juice","congressional","involvement","dominate","previously","transfer","analyze","attach","disaster","parking","prospect","boss","complaint","championship","fundamental","severe","enhance","mystery","impose","poverty","entry","spending","king","evaluate","symbol","maker","mood","accomplish","emphasis","illustrate","boot","monitor","Asian","entertainment","bean","evaluation","creature","commander","digital","arrangement","concentrate","usual","anger","psychological","heavily","peak","approximately","increasing","disorder","missile","equally","vary","wire","round","distribution","transportation","holy","twin","command","commission","interpretation","breakfast","strongly","engineering","luck","so-called","constant","clinic","veteran","smell","tablespoon","capable","nervous","tourist","toss","crucial","bury","pray","tomato","exception","butter","deficit","bathroom","objective","electronic","ally","journey","reputation","mixture","surely","tower","smoke","confront","pure","glance","dimension","toy","prisoner","fellow","smooth","nearby","peer","designer","personnel","educator","relative","immigration","belt","teaspoon","birthday","implication","perfectly","coast","supporter","accompany","silver","teenager","recognition","retirement","flag","recovery","whisper","gentleman","corn","moon","inner","junior","throat","salary","swing","observer","publication","crop","dig","permanent","phenomenon","anxiety","unlike","wet","literally","resist","convention","embrace","assist","exhibition","construct","viewer","pan","consultant","administrator","occasionally","mayor","consideration","CEO","secure","pink","buck","historic","poem","grandmother","bind","fifth","constantly","enterprise","favor","testing","stomach","apparent","weigh","install","sensitive","suggestion","mail","recipe","reasonable","preparation","wooden","elementary","concert","aggressive","false","intention","channel","extreme","tube","drawing","protein","quit","absence","Latin","rapidly","jail","diversity","honest","Palestinian","pace","employment","speaker","impression","essay","respondent","giant","cake","historian","negotiate","restore","substantial","pop","specialist","origin","approval","quietly","advise","conventional","depth","wealth","disability","shell","criticize","effectively","biological","onion","deputy","flat","brand","assure","mad","award","criteria","dealer","utility","precisely","arise","armed","highway","clinical","routine","wage","normally","phrase","ingredient","stake","Muslim","fiber","activist","Islamic","snap","terrorism","refugee","incorporate","hip","ultimate","switch","corporation","valuable","assumption","gear","barrier","minor","provision","killer","assign","gang","developing","classic","chemical","label","teen","index","vacation","advocate","draft","extraordinary","heaven","rough","yell","pregnant","distant","drama","satellite","personally","clock","chocolate","Italian","Canadian","ceiling","sweep","advertising","universal","spin","button","bell","rank","darkness","clothing","super","yield","fence","portrait","survival","roughly","lawsuit","testimony","bunch","burden","react","chamber","furniture","cooperation","string","ceremony","communicate","cheek","lost","profile","mechanism","disagree","penalty","resort","destruction","unlikely","tissue","constitutional","pant","stranger","infection","cabinet","broken","apple","electric","proceed","bet","literary","virus","stupid","dispute","fortune","strategic","assistant","overcome","remarkable","occupy","statistics","shopping","cousin","encounter","wipe","initially","blind","port","electricity","genetic","adviser","spokesman","retain","incentive","slave","translate","accurate","terror","expansion","elite","Olympic","dirt","odd","rice","bullet","tight","Bible","chart","solar","square","concentration","complicated","gently","champion","scenario","telescope","reflection","revolution","strip","interpret","friendly","tournament","fiction","detect","tremendous","lifetime","recommendation","senator","hunting","salad","guarantee","innocent","boundary","pause","remote","satisfaction","journal","bench","lover","raw","awareness","surprising","withdraw","deck","similarly","newly","pole","testify","mode","dialogue","imply","naturally","mutual","founder","advanced","pride","dismiss","aircraft","delivery","mainly","bake","freeze","platform","finance","sink","attractive","diverse","relevant","ideal","joy","regularly","working","singer","evolve","shooting","partly","unknown","offense","counter","DNA","potentially","thirty","justify","protest","crash","craft","treaty","terrorist","insight","possess","politically","tap","extensive","episode","swim","tire","fault","loose","shortly","originally","considerable","prior","intellectual","assault","relax","stair","adventure","external","proof","confident","headquarters","sudden","dirty","violation","tongue","license","shelter","rub","controversy","entrance","properly","fade","defensive","tragedy","net","characterize","funeral","profession","alter","constitute","establishment","squeeze","imagination","mask","convert","comprehensive","prominent","presentation","regardless","load","stable","introduction","pretend","elderly","representation","deer","split","violate","partnership","pollution","emission","steady","vital","fate","earnings","oven","distinction","segment","poet","mere","exciting","variation","comfort","radical","adapt","Irish","honey","correspondent","pale","musician","significance","vessel","storage","flee","mm-hmm","leather","distribute","evolution","ill","tribe","shelf","grandfather","lawn","buyer","dining","wisdom","council","vulnerable","instance","garlic","capability","poetry","celebrity","gradually","stability","fantasy","scared","plot","framework","gesture","depending","ongoing","psychology","counselor","chapter","divorce","owe","pipe","athletic","slight","math","shade","tail","sustain","mount","obligation","angle","palm","differ","custom","economist","soup","celebration","efficient","composition","satisfy","pile","briefly","carbon","closer","consume","scheme","crack","frequency","tobacco","survivor","psychologist","wealthy","galaxy","given","ski","limitation","OK","trace","appointment","preference","meter","explosion","publicly","incredible","fighter","rapid","admission","hunter","educate","painful","friendship","aide","infant","calculate","fifty","rid","porch","tendency","uniform","formation","scholarship","reservation","efficiency","qualify","mall","derive","scandal","PC","helpful","impress","heel","resemble","privacy","fabric","contest","proportion","guideline","rifle","maintenance","conviction","trick","organic","tent","examination","publisher","strengthen","proposed","myth","sophisticated","cow","standing","asleep","tennis","nerve","barrel","bombing","membership","ratio","menu","controversial","desperate","lifestyle","humor","loud","glove","sufficient","narrative","photographer","helicopter","modest","provider","delay","agricultural","explode","stroke","scope","punishment","handful","badly","horizon","curious","downtown","girlfriend","prompt","cholesterol","absorb","adjustment","taxpayer","eager","principal","detailed","motivation","assignment","restriction","laboratory","workshop","differently","auto","romantic","cotton","motor","sue","flavor","overlook","float","undergo","sequence","demonstration","jet","orange","consumption","assert","blade","temporary","medication","cabin","bite","edition","valley","pitch","pine","brilliant","versus","manufacturing","absolute","chef","discrimination","offensive","boom","register","appoint","heritage","God","dominant","successfully","shit","lemon","hungry","wander","submit","economics","naked","anticipate","nut","legacy","extension","shrug","battery","arrival","legitimate","orientation","inflation","cope","flame","cluster","wound","dependent","shower","institutional","depict","operating","flesh","garage","operator","instructor","collapse","borrow","furthermore","comedy","mortgage","sanction","civilian","weekly","habitat","grain","brush","consciousness","devote","measurement","province","ease","seize","ethics","nomination","permission","wise","actress","summit","acid","odds","gifted","frustration","medium","physically","distinguish","shore","repeatedly","lung","running","distinct","artistic","discourse","basket","ah","fighting","impressive","competitor","ugly","worried","portray","powder","ghost","persuade","moderate","subsequent","continued","cookie","carrier","cooking","frequent","ban","awful","admire","pet","miracle","exceed","rhythm","widespread","killing","lovely","sin","charity","script","tactic","identification","transformation","everyday","headline","venture","invasion","nonetheless","adequate","piano","grocery","intensity","exhibit","blanket","margin","quarterback","mouse","rope","concrete","prescription","African-American","chase","brick","recruit","patch","consensus","horror","recording","changing","painter","colonial","pie","sake","gaze","courage","pregnancy","swear","defeat","clue","reinforce","confusion","slice","occupation","dear","coal","sacred","formula","cognitive","collective","exact","uncle","captain","sigh","attribute","dare","homeless","gallery","soccer","defendant","tunnel","fitness","lap","grave","toe","container","virtue","abro", "canal", "inland"];

// ===================================================================================================================

function readFile(filename, callback){
	fs.readFile(filename, 'utf8', function(err, data) {
		if (err){
			callback(err,null);
		}else{
			callback(null,data);
		}
	});
}

// ====================================================================================================================

var formulate = function(query, callback) {

	var stopwords = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',"'", ".", "?","like", "place","a", "about", "above", "above", "across", "after", "afterwards", "again", "against", "all", "almost", "alone", "along", "already", "also","although","always","am","among", "amongst", "amoungst", "amount",  "an", "and", "another", "any","anyhow","anyone","anything","anyway", "anywhere", "are", "around", "as",  "at", "back","be","became", "because","become","becomes", "becoming", "been", "before", "beforehand", "behind", "being", "below", "beside", "besides", "between", "beyond", "bill", "both", "bottom","but", "by", "call", "can", "cannot", "cant", "co", "con", "could", "couldnt", "cry", "de", "describe", "detail", "do", "done", "down", "due", "during", "each", "eg", "eight", "either", "eleven","else", "elsewhere", "empty", "enough", "etc", "even", "ever", "every", "everyone", "everything", "everywhere", "except", "few", "fifteen", "fify", "fill", "find", "fire", "first", "five", "for", "former", "formerly", "forty", "found", "four", "from", "front", "full", "further", "get", "give", "go", "had", "has", "hasnt", "have", "he", "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "him", "himself", "his", "how", "however", "hundred", "i", "ie", "if", "in", "inc", "indeed", "interest", "into", "is", "it", "its", "itself", "keep", "last", "latter", "latterly", "least", "less", "ltd", "made", "many", "may", "me", "meanwhile", "might", "mill", "mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", "myself", "name", "namely", "neither", "never", "nevertheless", "next", "nine", "no", "nobody", "none", "noone", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", "own","part", "per", "perhaps", "please", "put", "rather", "re", "same", "see", "seem", "seemed", "seeming", "seems", "serious", "several", "she", "should", "show", "side", "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone", "something", "sometime", "sometimes", "somewhere", "still", "such", "system", "take", "ten", "than", "that", "the", "their", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore", "therein", "thereupon", "these", "they", "thickv", "thin", "third", "this", "those", "though", "three", "through", "throughout", "thru", "thus", "to", "together", "too", "top", "toward", "towards", "twelve", "twenty", "two", "un", "under", "until", "up", "upon", "us", "very", "via", "was", "we", "well", "were", "what", "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", "with", "within", "without", "would", "yet", "you", "your", "yours", "yourself", "yourselves", "the"];
	var terms = tokenizer.tokenize(query.toLowerCase());
	var queryLength = terms.length;
	var tempresult = [];
	var correctionoccured = false;

	console.log("reading file");
	readFile(trainingtext,function(err,data){
		if (err) {
			console.log("error reading from file: "+ err);
			callback(err);
		} else {
			console.log("training spell-checker");
			spell.train(data);

			// take original query and remove stop words and fix spelling errors
			console.log("removing stop words, fixing spelling errors,");
			console.log("singularizing query terms, converting words to most common form");
			for (var i = 0; i < queryLength; i++) {
				if (stopwords.indexOf(terms[i]) == -1) {
					terms[i] = spell.correct(terms[i]);
					terms[i] = nounInflector.singularize(terms[i]);

					var dist=0;
					var tempdist=0;
					var index=0;

					for (var k=0;k<commonwords.length;k++) {
						tempdist = natural.JaroWinklerDistance(terms[i], commonwords[k]);
						if (tempdist == 1) {index = k; break;}
						else if (tempdist>dist) {index = k;dist=tempdist;}
					}

					if (stemmer.stem(terms[i]) == stemmer.stem(commonwords[index])) {tempresult.push(commonwords[index]);}
					else {tempresult.push(terms[i]);}

				}
			}

			var afterstop = tempresult;
			var last = tempresult[tempresult.length-1];
			
			// the query after stop words are removed
			queryLength = afterstop.length;

			// ================================================================================
			// find common words/synonym of common words

			var keys = [];
			var nokey =[];

			for(var i=0;i<queryLength;i++) {
				if (commonwords.indexOf(afterstop[i]) != -1) { 
					keys.push(afterstop[i]);
					nokey.push(afterstop[i]);
				}
				else {nokey.push(afterstop[i]);}

			}

			wordnetSearch(nokey, 0, keys);
			
			// ========================================================================================================

			function wordnetSearch(toexpand, iteration, keylist) {
				if (iteration === toexpand.length) {
					
					var todb = {
						keywords: keylist,
						locations: ["LON"]
					};
					
					var err = null;
					callback(todb, err);
				} else {
					wordnet.lookup(toexpand[iteration], function(results) {
						console.log("finding expansion terms");
						for(var k=0; k<results.length;k++) {
							var extraterms = results[k].synonyms;
							
							for (var j=0;j<extraterms.length;j++) {
								if (commonwords.indexOf(extraterms[j]) != -1 && keylist.indexOf(extraterms[j]) == -1) {keylist.push(extraterms[j]);}
							}
						}
						wordnetSearch(toexpand,iteration+1,keylist);
					});					
				}
			}
			// ========================================================================================================

		}
	});        
}

// ====================================================================================================================

function foo(a,b) {console.log(a);}

formulate("fun holida", foo);

module.exports = {
	formulate: formulate

};

// ====================================================================================================================


