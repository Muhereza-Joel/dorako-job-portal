<?php

namespace App\Console\Commands;

use App\Models\Role;
use Illuminate\Console\Command;

class CreateRoleCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create:role {role}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new role';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $roleName = $this->argument('role');

        // Check if the role already exists
        if (Role::where('name', $roleName)->exists()) {
            $this->warn("Role '{$roleName}' already exists.");
            return;
        }

        // Create the role
        Role::create(['name' => $roleName]);
        $this->info("Role '{$roleName}' created successfully.");
    }
}
