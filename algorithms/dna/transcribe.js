// Ben Merchant  - Jan 19, 2017

// store this in JSON later
// initial test DNA nucleotide strand to display in <textarea>
var rawDNA = "TACGTACCAGTATAGACCATAGATAGATAGGGATAGTAAATTTACATGCGAGCTAGATATATAGGTAGTGATAGATTAGGGCTAATCTACATATGCGCCGAGCGCTAGCGATAGAGAGTAGTAGCGATGTAGATTTACATAGCGGGCCGTCTCACATACGCATATTACGACGATTGGATTTACCGCGATACGGTCAGAGTAGGCGCAGGAATCTACTTATATTTATAGCGCCACGGATGTGGTAGACAGATAACT";
// object to hold the amino acids
// each Acid will have its own array. some will be short


// properties are Amino Acids
// the values are the codons 
// i would have like to have handled this with a .JSON 
var aminoAcids = {
	'STOP': ['UAA','UAG','UGA'],
	'Met': ['AUG'],
	'Phe': ['UUU','UUC'],
	'Leu': ['UUA','UUG','CUU','CUC','CUA','CUG'],
	'Ile': ['AUU','AUC','AUA'],
	'Val': ['GUU','GUC','GUA','GUG'],
	'Ser': ['UCU','UCC','UCA','UCG','AGU','AGC'],
	'Pro': ['CCU','CCC','CCA','CCG'],
	'Thr': ['ACU','ACC','ACA','ACG'],
	'Ala': ['GCU','GCC','GCA','GCG'],
	'Tyr': ['UAU','UAC'],
	'His': ['CAU','CAC'],
	'Gln': ['CAA','CAG'],
	'Asn': ['AAU','AAC'],
	'Lys': ['AAA','AAG'],
	'Asp': ['GAU','GAC'],
	'Glu': ['GAA','GAG'],
	'Cys': ['UGU','UGC'],
	'Trp': ['UGG'],
	'Arg': ['CGU','CGC','CGA','CGG','AGA','AGG'],
	'Gly': ['GGU','GGC','GGA','GGG']
}


// cache the <textarea> element ids
var $nucleoDNA = $('#nucleoDNA');
var $nucleoRNA = $('#nucleoRNA');
var $codonRNA = $('#codonRNA');
var $proteinChains = $('#proteinChains');
var $proteinFrequency = $('#proteinFrequency');

// cache the <button> elements
var $transcribeBTN = $('button#transcribeBTN');
var $codonBTN = $('button#codonBTN');
var $proteinBTN = $('button#proteinBTN');


var rawRNA = []; // declare/initialize array for RNA triplets as a global var

// v2.0 this is now an array of arrays
// [0] will be the chain
// [1] will be the object with the counters
var AAchains = []; // this is the global array to hold each chain of proteins

// object for the nucleotide base pairings
var basePairs = {
	'A': 'U',
	'T': 'A',
	'G': 'C',
	'C': 'G'
}

// this will be an array of objects, one for each codon
var rnaBaseCounter = [];
// this will be an array of objects, one for each chain
var chainBaseCounter = [];
//v2.0
// temp array to sort the Amino Acids for the next object
var protArray = [];
// object to count the protein frequencies
var proteinFreq = {};

// main function using jQuery
$(function(){
	//load rawDNA into the <textarea> box
	$nucleoDNA.prepend(rawDNA);
	// v2.0 going to create this array as soon as the page is loaded
	Object.keys(aminoAcids).forEach(function(key){
		protArray.push(key);
	});
	// sort the array
	protArray.sort();
	// create an object with these sorted keys and 0 as each value
	var tempString = "";
	for(var vv=0; vv<protArray.length; vv++){
		tempString += protArray[vv];
		
		proteinFreq[tempString]= 0;
		
		tempString = "";
		
	}
	
	
	
	
	// deal with first button click
	$transcribeBTN.on('click',function(e){
		e.preventdefault;
		
		var DNA = $nucleoDNA.text();// store the data from the DNA <textarea>
		var RNAstring = "";			// blank string for raw RNA data	
		var tempTides = "";			// temp string to hold each triplet
		//v2.0
		var tempObj = {// temp object to hold nucleotide counters for each Codon
			'U': 0,
			'A': 0,
			'C': 0,
			'G': 0			
		}; 
		
		for(var i=0; i<DNA.length; i++){
			if(basePairs.hasOwnProperty(DNA[i])){ 	// if the character is in the raw DNA
				// Modifying these two baseParis object calls to account for array
				RNAstring += basePairs[DNA[i]];		// save its compliment in a new string
				tempTides += basePairs[DNA[i]];		// save the RNA compliment in another string for triplets
				
				// v2.0
				// add the current nucleotide to the count in the tempObj
				if(tempObj.hasOwnProperty(basePairs[DNA[i]])){ tempObj[basePairs[DNA[i]]]++; }
				
				
				
				
				if(tempTides.length==3){ 	// if the temp string is three chars long
					rawRNA.push(tempTides); // push the temp string to the end of the rawRNA array
					tempTides = ""; 		// clear the temp string
					//v2.0
					// push the tempObj to the rnaBaseCounter array
					
					// since JS passes objects by reference, need to build an object iteratively
					// screw it. for right now just hard code it
					rnaBaseCounter.push({
						'U': tempObj['U'],
						'A': tempObj['A'],
						'C': tempObj['C'],
						'G': tempObj['G']
					});
					// clear the tempObj
					Object.keys(tempObj).forEach(function(key){ // key is each nucleotide 
						tempObj[key]=0; // clear each key
					});
				}
			}
		}
		$nucleoRNA.prepend(RNAstring); 
	});
	
	// all this next button is doing is printing/formatting
	
	// deal with second button click
	$codonBTN.on('click',function(e){
		e.preventdefault;
		// need to check if first event (transcribeBTN) has taken place first
		var printString = ""; // initialize empty string for output
		
		printString = rawRNA.join('-');
		
		
		
		$codonRNA.prepend(printString);
	});
	
	$proteinBTN.on('click',function(e){
		e.preventdefault;
		
		// convert codons to proteins in a locally scoped array
		var localCodonArr = [];
		
		//v2.0 tempObj for each chain
		var tempObj = {// temp object to hold nucleotide counters
			'U': 0,
			'A': 0,
			'C': 0,
			'G': 0			
		};
		// v2.0 
		
		for(var ii=0; ii<rawRNA.length; ii++){ // loop through every RNA codon triplet (ii)
			// dont forget. the AMINO ACID is the KEY
			Object.keys(aminoAcids).forEach(function(key){ // loop through every key in the object
				
				
				for(var jj=0; jj<aminoAcids[key].length; jj++){// loop through every element in array value
					if(rawRNA[ii]==aminoAcids[key][jj]){
						localCodonArr.push(key);
						
						//v2.0 make an object counter for each chain
						Object.keys(tempObj).forEach(function(key){
							tempObj[key]+=rnaBaseCounter[ii][key];
						});
						// v2.0
						// incrementing the counters in the array counting structure
						if(proteinFreq.hasOwnProperty(key)){
							proteinFreq[key]++;
						}	
						
						
						
						
						
						if(key=='STOP'){
							// v2.0 AAchains is now an array of arrays
							// [0] is the protein chain
							// [1] is the object with the nucleotide counters
							AAchains.push([
								localCodonArr,
								{
									
									'A': tempObj['A'], 
									'C': tempObj['C'], 
									'G': tempObj['G'],
									'U': tempObj['U']
								}
							
							]);
							localCodonArr = [];
							// clear the tempObj
							Object.keys(tempObj).forEach(function(key){ // key is each nucleotide 
								tempObj[key]=0; // clear each key
							});
						}
					}
					
				};
			})
				
		};
					
								
						
		
		
		
		
		
		
		
		
		
		var tempString = "";
		var tempCounter = 0;
		var temperString = "";
		var temperCounter = 0;
		
		for(var uu=0; uu<AAchains.length; uu++){
			// calculations
			
			// nucleotide calculations
			Object.keys(AAchains[uu][1]).forEach(function(key){
				tempCounter += AAchains[uu][1][key];
			});
			
			
			
			// build the chains into the print string
			tempString += uu+1 + '\) ';
			tempString += AAchains[uu][0].join('-');
			tempString += '\n';
			
			// build nucleotide frequencies into the print string
			AAchains[uu][1].sort
			Object.keys(AAchains[uu][1]).forEach(function(key){
				tempString += '\t';
				tempString+= key + ' : ' + (AAchains[uu][1][key]/tempCounter*100).toFixed(2) + '%\n';
				
			});
			
			
			//clear tempCounter
			tempCounter = 0;
		}
		// v2.0 calculate total proteins
		Object.keys(proteinFreq).forEach(function(key){
			temperCounter += proteinFreq[key];
		});
		// // build string to add to DOM outside previous loop
		Object.keys(proteinFreq).forEach(function(key){
			temperString += key +' :\t'+ (proteinFreq[key]/temperCounter*100).toFixed(2)+'%\n';
		});
		
		
		
		
		$proteinChains.prepend(tempString); // add the chains to the DOM
		$proteinFrequency.prepend(temperString); // add the protein frequencies to the DOM
		
		$('body').append('Total Proteins: ' + AAchains.length);
		$('body').append('\n<pre>&lt;RAWDATA&gt;'+rawRNA.join('')+'&lt;/RAWDATA&gt;</pre>');
	});
	
	
	
	
});






