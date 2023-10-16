// https://medium.com/@luiscelismx/implementing-strategy-pattern-node-js-8677537104ae
class StrategyManager{
  constructor() {
      this.strategy = null
  }
  set strategy(strategy){
      this._strategy = strategy
  }
  get strategy() {
      return this._strategy
  }
  doRepoCheck(){
      this._strategy.doRepoCheck()
  }
}