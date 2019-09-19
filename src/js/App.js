import VMachineController from "./VMachineController.js";
import Wallet from "./model/Wallet.js";
import Machine from "./model/Machine.js";

const machine = new Machine();

const wallet = new Wallet();

new VMachineController(machine, wallet);








