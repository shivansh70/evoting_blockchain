// Specifically request an abstraction for Registry
var Election = artifacts.require("ElectionECCwPrecompile");
var BigNumber = require('bignumber.js');

contract('ElectionECCwPrecompile', function(accounts) {

    let electionContractInstance;

    it("Organizer should be able to register eligible voters", function() {
        return Election.deployed().then(function(instance) {
            electionContractInstance = instance;
            instance.addEligibleVoter(accounts[1]);
            return instance.eligibleVoters.call(accounts[1]);
        }).then(function(member) {
            assert.equal(member[0], true, "Second account should be registered already");
        });
    });

    //function verifyBlindSig(uint256 m, uint256 c, uint256 s)

    it("Verify", function() {
        return Election.deployed().then(function(instance) {
            electionContractInstance = instance;
            return electionContractInstance.verifyBlindSig("69","0x6409c588d8b2ec3988650c3c7b8492249b7431231a5980a542b0ac8b44cf98f5",'0x142d95868dd3964125282f4940c6b6c8263830b99f16669f0b24bd4ed0e322a1');
        }).then(function(member) {
            //console.log(member.toString());
            //console.log(new BigNumber(member[1]).toString(16));
            //console.log(new BigNumber(member[2]).toString(16));
        });
    });

    it("Vote", function() {
        return Election.deployed().then(function(instance) {
            electionContractInstance = instance;
            return electionContractInstance.Vote(1,"36569675563270980802762714306156177901149277261141117320653538205171502807189","6584969667293602680567734539575163142389903381909774456551685991814241531484");
        }).then(function(member) {
            console.log(member);
            return electionContractInstance.votes.call(1).then(function (value) {
                console.log(value.toString());
            });
            //console.log(new BigNumber(member[1]).toString(16));
            //console.log(new BigNumber(member[2]).toString(16));
        });
    });
    /*
        it("Organizer should be able to remove eligible voters", function() {
            return Election.deployed().then(function(instance) {
                electionContractInstance.addEligibleVoter(accounts[1]);
                return electionContractInstance.eligibleVoters.call(accounts[1]);
            }).then(function(member) {
                assert.equal(member[0], true, "Second account should be registered already");
                electionContractInstance.removeEligibleVoter(accounts[1]);
                return electionContractInstance.eligibleVoters.call(accounts[1]);
            }).then(function(member) {
                assert.equal(member[0], false, "Second account should have been removed!")
            });
        });

        it("Voters should be able to vote", function() {
            return Election.deployed().then(function(instance) {
                electionContractInstance.addEligibleVoter(accounts[0]);
                electionContractInstance.Vote(1,1,"80084422859880547211683076133703299733277748156566366325829078699459944778998",12);
                return electionContractInstance.votes.call(1);
            }).then(function(member) {
                assert.equal(member.toNumber(), 1, "Vote has been cast");
            });
        });

        it("Votesuccess event should be emitted", function() {
            return Election.deployed().then(function(instance) {
                electionContractInstance.addEligibleVoter(accounts[0]);
                return electionContractInstance.Vote(1,1,"80084422859880547211683076133703299733277748156566366325829078699459944778998",12);
            }).then(function(member) {
                assert.equal(member.logs[1].args.voter,accounts[0], 'The event is emitted');
            });
        });

        it("Voters should be only able to cast a valid vote", function() {
            return Election.deployed().then(function(instance) {
                electionContractInstance.addEligibleVoter(accounts[0]);
                return electionContractInstance.Vote(1);
            }).then(() => {
                assert.ok(false, "It didn't fail");
        }, () => {
                assert.ok(true, "Passed");
            });
        });
    */



});
