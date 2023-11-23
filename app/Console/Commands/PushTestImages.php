<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Models\Property;
use App\Models\PropertyImage;

class PushTestImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'push:images';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $properties = Property::all();
        $images = [
          "https://www.mydomaine.com/thmb/7Z1D20vZj7Eex5SIr3E_nJMWw8k=/2048x1536/filters:no_upscale():max_bytes(150000):strip_icc()/SuCasaDesign-Modern-9335be77ca0446c7883c5cf8d974e47c.jpg",
          "https://www.mydomaine.com/thmb/WFdM9HMtxhr4ws33p0Kg5AwZxPo=/2048x1365/filters:no_upscale():max_bytes(150000):strip_icc()/SuCasaDesign-Modern2-ec89013bd4d74c6693f8247eee10134b.jpg",
          "https://cdn.vox-cdn.com/thumbor/Fxcu04YRa7U_UduABWNgsZmnoqc=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/16307403/hK8mAb3U.jpeg",
        ];

        foreach($properties as $p) {
          foreach($images as $i) {
            PropertyImage::create([
              'property_id' => $p->id,
              'url' => $i
            ]);
          }
        }

        return Command::SUCCESS;
    }
}
